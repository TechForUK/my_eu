CORDIS_OUTPUTS := cordis/output/cordis_data.geo.json \
	cordis/output/fp7_organizations.pkl.gz \
	cordis/output/fp7_projects.pkl.gz
OUTPUTS += $(CORDIS_OUTPUTS)

cordis/fp7_clean.ipynb.html: cordis/fp7_clean.ipynb fp7/input/**/* postcodes/input/**/* $(POSTCODES_OUTPUTS)
$(CORDIS_OUTPUTS): cordis/fp7_clean.ipynb.html
