ESIF_ENGLAND_OUTPUTS := esif/output/beneficiaries.geo.json \
	esif/output/esif_england_2014_2020.pkl.gz
OUTPUTS += $(ESIF_ENGLAND_OUTPUTS)

esif/england_esif_clean.ipynb.html: esif/england_esif_clean.ipynb esif/input/**/* postcodes/input/**/*
$(ESIF_ENGLAND_OUTPUTS): esif/england_esif_clean.ipynb.html

ESIF_SCOTLAND_OUTPUTS := esif/output/scotland_data.geo.json \
	esif/output/esif_scotland.pkl.gz
OUTPUTS += $(ESIF_SCOTLAND_OUTPUTS)

esif/scotland_esif_clean.ipynb.html: esif/scotland_esif_clean.ipynb esif/input/**/* postcodes/input/**/*
$(ESIF_SCOTLAND_OUTPUTS): esif/scotland_esif_clean.ipynb.html

ESIF_WALES_OUTPUTS := esif/output/wales_data.geo.json \
	esif/output/esif_wales.pkl.gz
OUTPUTS += $(ESIF_WALES_OUTPUTS)

esif/wales_esif_clean.ipynb.html: esif/wales_esif_clean.ipynb esif/input/**/* postcodes/input/**/*
$(ESIF_WALES_OUTPUTS): esif/wales_esif_clean.ipynb.html
