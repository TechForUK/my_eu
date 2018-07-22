from flask import Flask
from flask import render_template

import pandas as pd
from pandas import DataFrame


app = Flask(__name__)


def get_weights(beneficiaries: DataFrame) -> DataFrame:
    """
    Calculate map weights based on relative EU investment size.

    Google Maps says 3 is the default size, which is quite small.
    """

    beneficiaries = beneficiaries.copy()
    beneficiaries['weight'] = 5 * beneficiaries.eu_investment / beneficiaries.eu_investment.median()
    return beneficiaries


def get_beneficiaries() -> DataFrame:
    beneficiaries = pd.read_pickle('../data/beneficiaries.pkl')
    beneficiaries = get_weights(beneficiaries)
    return beneficiaries


def get_local_beneficiaries(map_lat: float, map_lng: float, map_zoom: int) -> DataFrame:
    """Return only projects that are fairly close to the map's centre."""

    return beneficiaries[
        (map_lat - 100 / map_zoom < beneficiaries.lat) &
        (beneficiaries.lat < map_lat + 100 / map_zoom) &
        (map_lng - 100 / map_zoom < beneficiaries.lng) &
        (beneficiaries.lng < map_lng + 100 / map_zoom)
    ][:500]


@app.route('/')
def map(map_lat=51.531840, map_lng=-0.125091, map_zoom=8):
    local_beneficiaries = get_local_beneficiaries(map_lat, map_lng, map_zoom)

    return render_template(
        'test-google-maps.html',
        map_lat=map_lat,
        map_lng=map_lng,
        map_zoom=map_zoom,
        api_key='KEY',
        beneficiaries=local_beneficiaries
    )


beneficiaries = get_beneficiaries()
