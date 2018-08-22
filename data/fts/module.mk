FTS_2016_OUTPUTS := fts/output/fts_2016.pkl.gz
OUTPUTS += $(FTS_2016_OUTPUTS)

fts/fts_2016_clean.ipynb.html: fts/fts_2016_clean.ipynb fts/input/**/* postcodes/input/**/*
$(FTS_2016_OUTPUTS): fts/fts_2016_clean.ipynb.html

FTS_2017_OUTPUTS := fts/output/fts_2017.pkl.gz
OUTPUTS += $(FTS_2017_OUTPUTS)

fts/fts_2017_clean.ipynb.html: fts/fts_2017_clean.ipynb fts/input/**/* postcodes/input/**/*
$(FTS_2017_OUTPUTS): fts/fts_2017_clean.ipynb.html
