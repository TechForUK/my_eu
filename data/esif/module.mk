ESIF_OUTPUTS := esif/output/beneficiaries.geo.json \
	esif/output/erdf_england_2014_2020.pkl.gz
OUTPUTS += $(ESIF_OUTPUTS)

esif/esif_clean.ipynb.html: esif/esif_clean.ipynb esif/input/**/* postcodes/input/**/* $(POSTCODES_OUTPUTS)
$(ESIF_OUTPUTS): esif/esif_clean.ipynb.html
