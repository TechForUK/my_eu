CAP_OUTPUTS := cap/output/cap_by_area.geo.json
OUTPUTS += $(CAP_OUTPUTS)

cap/cap_clean.ipynb.html: cap/cap_clean.ipynb cap/input/**/* postcodes/input/**/* $(POSTCODES_OUTPUTS)
cap/output/cap_by_area.geo.json: cap/cap_clean.ipynb.html
