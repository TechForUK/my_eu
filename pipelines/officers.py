"""
Company officers scraper and transformer.

Not designed to be run separately, but if you really want to, try...

Usage:
```
    luigi --local-scheduler --module my_eu.pipelines.officers CompanyOfficers --company-number [COMPANY NUMBER] --params '{"api_key": "[API KEY]"}'
```
"""

from typing import Dict, List

from datetime import datetime
import logging

import luigi
from luigi import LocalTarget

from pandas import DataFrame, Series

from algo.pipelines.steps.scrapers import SlowScraper
from algo.pipelines.steps.transformers import DocFrameTransformer
from algo.pipelines.steps.helpers import FilenameMixin


# From luigi.task
logger = logging.getLogger('luigi-interface')


class CompanyOfficersScraper(SlowScraper, FilenameMixin):
    """
    Save company officers for a given company number.

    Arguments
    - `company_number`  Company number for which to get officers
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
    out_filename = 'company_officers_{}_{}.json'
    url = 'https://api.companieshouse.gov.uk/company/{}/officers'
    company_number = luigi.Parameter()
    params = luigi.DictParameter()
    out_path = luigi.Parameter(default='')
    run_date = luigi.DateParameter(default=datetime.now())

    def input(self) -> Dict:
        url = self.url.format(self.company_number)
        # self.params is an OrderedDict inside a FrozenOrderedDict
        params = dict(self.params.get_wrapped())
        headers = {'Authorization': params['api_key']}
        return {'url': url, 'params': params, 'headers': headers}

    def output(self) -> Dict[str, LocalTarget]:
        keys = (self.company_number,)

        return {
            'doc': LocalTarget(self.get_out_path(keys)),
            'meta': LocalTarget(self.get_out_path(keys, self.meta_filename))
        }

    def complete(self) -> bool:
        """Add logic to cope with exceeding rate limit by forcing entire pipeline to pause for a while."""

        # TODO: Figure out what this error conditions is.
        if False:
            # Requesting results too quickly. Wait for a while and try again...
            logger.warning('Over rate limit. Having a nap...')
            self.sleep(min_sleep=self.over_rate_sleep)
            return False
        elif self.response.status_code == 404:
            logger.warning(f'Company does not exist or no officers found for company number {self.company_number}.')
            # We want to continue regardless if no officers. SlowsScraper checks response status was a 200, so
            # call grandparent Task, which just checks for file existence. Yik.
            return super(SlowScraper, self).complete()
        elif (
            self.response.status_code == 401 and
            self.response.headers.get('Ch-Authentication-Error', None) == 'Invalid authorization header'
        ):
            raise RuntimeError(f'Invalid API token.')
        else:
            return super().complete()


class CompanyOfficers(DocFrameTransformer):
    """
    Save company officers for a particular company.
    """

    out_filename = 'company_officers_{}_{}.pkl'
    company_number = luigi.Parameter()

    @property
    def keys(self):
        """`keys` parameter used in output filename."""

        return (self.company_number,)

    def requires(self) -> CompanyOfficersScraper:
        return CompanyOfficersScraper(
            company_number=self.company_number, params=self.params, out_path=self.out_path, run_date=self.run_date
        )

    def make_frame(self, officers: List[Dict], company_number: str) -> DataFrame:
        """Make a DataFrame from the officers, adding some useful metadata."""

        officer_col_map = {
            'address': 'officer_address',
            'links': 'officer_links',
            'address_line_1': 'officer_address_line_1',
            'premises': 'officer_premises',
            'locality': 'officer_locality',
            'postal_code': 'officer_postcode',
            'region': 'officer_region',
            'country': 'officer_country',
            'address_line_2': 'officer_address_line_2'
        }

        officers = DataFrame(officers)

        # May be no officers.
        if 'address' in officers.columns:
            officers = officers.join(officers.address.apply(lambda address: Series(address)))

        officers = officers.rename(columns=officer_col_map)
        officers['company_number'] = company_number
        return officers

    def run(self) -> None:
        """Save this company's officers as a DataFrame."""

        doc = self.read_doc()
        officers = self.make_frame(doc.get('items', {}), self.company_number)
        self.write_transformed(officers)
