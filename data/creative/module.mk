CREATIVE_OUTPUTS := \
	creative/output/creative_europe_organisations.pkl.gz \
	creative/output/creative_europe_projects.pkl.gz
OUTPUTS += $(CREATIVE_OUTPUTS)

creative/creative_clean.ipynb.html: creative/creative_clean.ipynb creative/input/**/* postcodes/input/**/*
$(CREATIVE_OUTPUTS): creative/creative_clean.ipynb.html
