all: outputs

# Each module may add to these variables.
OUTPUTS :=
CLEAN := $(wildcard **/*.ipynb.html)

# Include the description for each module.
MODULES := postcodes cap cordis
include $(patsubst %,%/module.mk,$(MODULES))

# Run a jupyter notebook.
%.ipynb.html: %.ipynb
	jupyter nbconvert --execute --output=$(notdir $<).html $<

.PHONY: outputs
outputs: $(OUTPUTS)

.PHONY:	clean
clean:
	rm -f $(CLEAN)

.PHONY:	clobber
clobber: clean
	rm -f $(OUTPUTS)
