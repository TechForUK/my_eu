"""
Companies House basic company information search and company officers aggregator pipeline.

Arguments
- `api-key`         Companies House API key (required)
- `companies`       List of companies to search. This should be a JSON snippet enclosed in single quotes, e.g. `'["The Hummingbird Bakery Ltd", "HSBC Alternative Investments Ltd"]'`
- `companies-file`  Name of file (pickled pandas object or CSV) containing companies to search

Usage:
```
    luigi --module my_eu.pipelines.companies CompaniesSearch --api-key [API KEY] --companies [LIST] --companies-file [PICKLE OR CSV]
```
"""

from typing import List, Dict

from datetime import datetime
import logging
import pickle

import luigi
from luigi import LocalTarget

from pandas import Series, DataFrame

from my_eu.pipelines.officers import CompanyOfficers
from algo.pipelines.steps.transformers import FrameAggregatorTransformer, DocFrameTransformer
from algo.pipelines.steps.helpers import ReadFrameMixin, FilenameMixin
from algo.pipelines.steps.scrapers import SlowScraper

# From luigi.task
logger = logging.getLogger('luigi-interface')


class CompanySearchOfficers(FrameAggregatorTransformer):
    """
    Get Companies House officers for a number of companies (aggregator).

    Will attempt to get officers for the top `max_search_officers` search results.

    Arguments
    - `company`             Search company name
    - `company_numbers`     Company name for which to search
    """

    out_filename = 'company_officers_{}_{}.pkl'
    company = luigi.Parameter()
    company_numbers = luigi.ListParameter()
    params = luigi.DictParameter()

    @property
    def keys(self):
        """`keys` parameter used in output filename."""

        return (self.company,)

    def require_officers(self, company_numbers: List[str]) -> List[CompanyOfficers]:
        """Create dynamic dependency list to get officers for all search companies wanted."""

        return self.require_tasks(CompanyOfficers, {}, 'company_number', company_numbers)

    def get_top_search_company_numbers(self, company_numbers: DataFrame) -> Series:
        """Get company numbers for top search results"""

        params = dict(self.params.get_wrapped())
        max_search_officers = params['max_search_officers']
        return company_numbers[:max_search_officers]

    def run(self) -> None:
        """Get officers for the top company search results."""

        # Get company numbers for the top search results.
        company_numbers = self.get_top_search_company_numbers(self.company_numbers)
        # Request company officers for these top companies.
        companies_officers = yield self.require_officers(company_numbers)
        officers = self.read_outputs(companies_officers)
        self.write_transformed(officers)


class CompanySearchScraper(SlowScraper, FilenameMixin):
    """
    Save company search results from Companies House.

    TODO: Refactor this to a common superclass for both scrapers.

    Arguments
    - `company`         Company name for which to search
    - `params`          Parameters to pass along to scraper (for requests module)
    - `out_path`        Location at which to save output (default current folder)
    - `run_date`        Date to use in filenames (default today)
    """

    # TODO: needs to be this long?
    timeout = 30
    # Slow this down to avoid bumping into rate limit.
    rv_scale = 5
    # Wait 30m if we exceed the rate limit.
    over_rate_sleep = 1800
    out_filename = 'ch_company_search_{}_{}.json'
    url = 'https://api.companieshouse.gov.uk/search/companies'
    company = luigi.Parameter()
    params = luigi.DictParameter()
    out_path = luigi.Parameter(default='')
    run_date = luigi.DateParameter(default=datetime.now())

    def input(self) -> Dict:
        # self.params is an OrderedDict inside a FrozenOrderedDict
        params = dict(self.params.get_wrapped())
        params.update(q=self.company)
        headers = {'Authorization': params['api_key']}
        return {'url': self.url, 'params': params, 'headers': headers}

    def output(self) -> Dict[str, LocalTarget]:
        keys = (self.company,)

        return {
            'doc': LocalTarget(self.get_out_path(keys)),
            'meta': LocalTarget(self.get_out_path(keys, self.meta_filename))
        }

    def complete(self) -> bool:
        """Add logic to cope with exceeding rate limit by forcing entire pipeline to pause for a while."""

        # TODO: Figure out what these error conditions are.
        if (
            False
        ):
            # Requesting results too quickly. Wait for a while and try again...
            logger.warning('Over rate limit. Having a nap...')
            self.sleep(min_sleep=self.over_rate_sleep)
            return False
        elif (
            False
        ):
            raise RuntimeError(f'Unknown company "{self.company}".')
        elif (
            self.response.status_code == 401 and
            self.response.headers.get('Ch-Authentication-Error', None) == 'Invalid authorization header'
        ):
            raise RuntimeError(f'Invalid API token.')
        else:
            return super().complete()


class CompanySearch(DocFrameTransformer):
    """
    Get Companies House search results for one company.

    Arguments
    - `company`                 Company name for which to search
    """

    out_filename = 'company_search_{}_{}.pkl'
    # max_search_officers = luigi.IntParameter()
    company = luigi.Parameter()
    params = luigi.DictParameter()

    @property
    def keys(self):
        """`keys` parameter used in output filename."""

        return (self.company,)

    def requires(self) -> CompanySearchScraper:
        return CompanySearchScraper(company=self.company, params=self.params, out_path=self.out_path, run_date=self.run_date)

    def make_frame(self, company_search: List[Dict]) -> DataFrame:
        """Make a DataFrame from the company search results."""

        company_search = DataFrame(company_search)

        if 'address' in company_search.columns:
            company_search = company_search.join(company_search.address.apply(lambda address: Series(address)))
            company_search = company_search.rename(columns={'postal_code': 'postcode'})

        company_search['search_company'] = self.company
        return company_search

    def read_company_search_officers(self, company_search_officers_target: LocalTarget) -> Series:
        """Read company search officers."""

        with company_search_officers_target.open('rb') as in_file:
            return pickle.load(in_file)

    def require_company_search_officers(self, company_search: DataFrame) -> DataFrame:
        """Get company officers for top search results."""

        company_numbers = company_search.company_number.tolist()

        return CompanySearchOfficers(
            params=self.params,
            out_path=self.out_path,
            run_date=self.run_date,
            company=self.company,
            company_numbers=company_numbers
        )

    def run(self) -> None:
        """Save company search results as a DataFrame."""

        doc = self.read_doc()
        company_search = self.make_frame(doc['items'])

        if len(company_search):
            company_search_officers_target = yield self.require_company_search_officers(company_search)
            company_search_officers = self.read_company_search_officers(company_search_officers_target)
            company_search = company_search.merge(company_search_officers, on='company_number')

        self.write_transformed(company_search)


class CompaniesSearch(FrameAggregatorTransformer, ReadFrameMixin):
    """
    Get Companies House company search results for a set of search names.

    Company names, e.g. "Dale Wares Ltd", "HSBC UK Plc", should be provided as a list.

    - Filename of a CSV or pickled DF or Series
    - On the commandline

    A set of matches will be provided for each.

    Arguments
    - `api_key`         Companies House API key (required)
    - `companies`       List of company names to query
    - `companies_file`  Name of file containing list of company names to query (pickled pandas object or CSV)
    """

    out_filename = 'companies_search_{}_{}.pkl'
    api_key = luigi.Parameter()
    companies = luigi.ListParameter(default=[])
    companies_file = luigi.Parameter(default='')
    # For ReadFrameMixin
    frame_file_col_name = 'company'

    # Search "internals"; probably won't want to change these.
    params = luigi.DictParameter(default={
        'items_per_page': 100,
        'start_index': 0,
        'max_search_officers': 2
    })

    @property
    def frame_file(self):
        """For ReadFrameMixin."""

        return self.companies_file

    def update_query_params(self):
        """Update API query parameters with API key."""

        params = dict(self.params)
        params['api_key'] = self.api_key
        # Luigi seems to use `normalize` to freeze (make hashable) a normal dict so can be passed around as a param.
        # There's probably a better way to do this...
        self.params = luigi.DictParameter().normalize(params)

    def read_param_companies(self):
        """Read search companies supplied on the commandline."""

        if self.companies:
            return Series(self.companies, name='company')
        return Series(name='company')

    def get_search_companies(self):
        """
        Get search companies from commandline and input file.

        Both are optional, but need to supply one of the other.
        """

        file_companies = self.read_frame()
        param_companies = self.read_param_companies()
        search_companies = file_companies.append(param_companies)

        if len(search_companies):
            search_companies = search_companies.str.replace(r'\s+', ' ').str.strip().str.lower().drop_duplicates().reset_index(drop=True)
        else:
            print('You need to supply something for either companies or file-companies. :(')

        return search_companies

    def require_companies(self, search_companies: Series) -> List[CompanySearch]:
        """Create dynamic dependency list to query all companies requested."""

        # task_params = {'max_results': self.max_results}
        return self.require_tasks(CompanySearch, {}, 'company', search_companies)

    def run(self) -> None:
        """Search for all requested companies and officers for the top results for each."""

        self.update_query_params()
        search_companies = self.get_search_companies()
        # Request desired search companies.
        company_data = yield self.require_companies(search_companies)
        self.read_write_chunked(company_data)
