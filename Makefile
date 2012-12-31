all: \
	assets/style.css \
	assets/script.js \
	favicon.ico \
	$(patsubst %.jpg.png, %.jpg, $(patsubst images/%, assets/%, $(shell ls images/*)))

assets/style.css: \
	assets/_attributions.css \
	assets/_reset.css \
	assets/_sections-speakers.css \
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
assets/_%.css: css/%.styl
	$(check_stylus)
	$(stylus) -I css -u nib < $< > $@

# Retina PNGs
assets/%@2x.png: images/%@2x.png
	$(check_imagemagick)
	$(check_optipng)
	$(optipng) -quiet -clobber $< -out $@
	$(convert) $@ -resize 50% $(patsubst %@2x.png, %.png, $@)

# Retina JPGs
assets/%@2x.jpg: images/%@2x.jpg.png
	$(check_imagemagick)
	$(check_optipng)
	$(convert) $< -quality 80 -strip -interlace plane $@
	$(convert) $< -resize 50% -quality 90 -strip -interlace plane $(patsubst %@2x.jpg, %.jpg, $@)

# Regular PNGs
assets/%.png: images/%.png
	$(check_optipng)
	$(optipng) -quiet -clobber $< -out $@

# Regular JPGs
assets/%.jpg: images/%.jpg.png
	$(check_imagemagick)
	$(convert) $< -quality 90 -strip -interlace plane $@


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
	rm -f assets/*

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
