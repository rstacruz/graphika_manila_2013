all: \
	assets/style.css \
	assets/script.js \
	favicon.ico \
	$(patsubst %.jpg.png, %.jpg, $(patsubst images/%, assets/%, $(shell ls images/*)))

assets/style.css: \
	assets/attributions.css \
	assets/reset.css \
	assets/sections.css
	$(COMBINE)

assets/script.js: \
	js/attributions.js \
	js/foresight.min.js \
	js/setup.js
	$(COMBINE)

favicon.ico: favicon.png
	convert $< $@

cachebust:
	perl -p -i -e "s/\?v=[0-9]+/?v=`echo $$RANDOM`/" index.html

# ----------------------------------------------------------------------------

# Stylus compilation (http://learnboost.github.com/stylus)
assets/%.css: css/%.styl
	$(check_stylus)
	$(stylus) -I css -u nib < $< > $@

# Regular JPGs
assets/%.jpg: images/%.jpg.png
	$(check_imagemagick)
	$(convert) $< -quality 60 -strip -interlace plane $@

# Retina PNGs
assets/%@2x.png: images/%@2x.png
	$(check_imagemagick)
	$(check_optipng)
	$(optipng) -force -quiet $< -out $@
	$(convert) $@ -resize 50% $(patsubst %@2x.png, %.png, $@)

# Regular PNGs
assets/%.png: images/%.png
	$(check_optipng)
	$(optipng) -force -quiet $< -out $@

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
	rm -f assets/*.{css,jpg,png} assets/script.js

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

convert ?= convert
check_imagemagick = \
	@which $(convert) >/dev/null || \
		(echo " ! Error: You need ImageMagick to optimize images." && \
		 echo "   Try: 'brew install imagemagick'" && \
		 exit 1)

optipng ?= optipng
check_optipng = \
	@which $(optipng) >/dev/null || \
		(echo " ! Error: You need Optipng to process .png files." && \
		 echo "   Try: 'brew install optipng'" && \
		 exit 1)

COMBINE = rm -f $@; cat $^ > $@

.PHONY: start watch server all clean cachebust

PORT ?= 9110
