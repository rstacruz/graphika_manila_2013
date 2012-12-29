all: \
	assets/style.css \
	assets/script.js \
	favicon.ico

assets/style.css: \
	assets/attributions.css \
	assets/reset.css \
	assets/sections.css
	$(COMBINE)

assets/script.js: \
	js/attributions.js
	$(COMBINE)

favicon.ico: favicon.png
	convert $< $@

# ----------------------------------------------------------------------------
# Stylus compilation (http://learnboost.github.com/stylus)

assets/%.css: css/%.styl
	$(check_stylus)
	$(stylus) -I css -u nib < $< > $@
	@chmod a-w $@

# ----------------------------------------------------------------------------

# Starts the local development
start: all
	make server & make watch

# Starts a local HTTP server for development
server:
	@echo "==> Starting local preview server, ^C to stop"
	@echo "    Point your browser to: http://localhost:$(PORT)/"
	@echo
	@python -m SimpleHTTPServer $(PORT)

# Cleans all compiled assets
clean:
	rm -f assets/*.css assets/script.js

# Simple file watcher
watch:
	@echo "==> Watching for changes"
	@while true; do make all | grep -v "Nothing to be done"; sleep 0.1; done

# ----------------------------------------------------------------------------

stylus ?= stylus
check_stylus = \
	@which $(stylus) >/dev/null || \
		(echo " ! Error: You need Stylus and Nib to process .styl files." && \
		 echo "   Try: 'sudo npm install -g stylus nib'" && \
		 exit 1)

COMBINE = rm -f $@; cat $^ > $@; chmod a-w $@

.PHONY: start watch server all clean deploy

PORT ?= 9110
