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


class CompaniesHouseScraper(SlowScraper, FilenameMixin):
    pass