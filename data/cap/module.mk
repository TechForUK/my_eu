CAP_OUTPUTS := \
	cap/output/cap_by_area.geo.json \
	cap/output/cap_by_area.pkl.gz
OUTPUTS += $(CAP_OUTPUTS)

cap/cap_clean.ipynb.html: cap/cap_clean.ipynb cap/input/**/* postcodes/input/**/* $(POSTCODES_OUTPUTS)
$(CAP_OUTPUTS): cap/cap_clean.ipynb.html
