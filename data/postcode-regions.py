#
# Turn the data scraped (by copy paste) from
# https://www.gbmaps.com/4-digit-postcode-maps/free-uk-postcode-district-maps.htm
# into a CSV.
#
# Manually fixed typos / inconsistencies in input:
# - SSwansea -> Swansea
# - London N -> N-London
#

import csv
import re

with open('postcode-regions.txt', 'r') as file:
    lines = file.readlines()

AREA_RX = re.compile(r'([A-Z]{1,2})-')

with open('postcode-regions.csv', 'w') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['region', 'area', 'area_name'])

    while lines:
        region = lines.pop(0).rstrip().title()

        areas_line = lines.pop(0).rstrip()
        areas = AREA_RX.split(areas_line)
        assert(areas.pop(0) == '')
        assert(len(areas) % 2 == 0)

        for i in range(len(areas) // 2):
            csv_writer.writerow([region, areas[2 * i], areas[2 * i + 1]])

        if lines:
            lines.pop(0)
