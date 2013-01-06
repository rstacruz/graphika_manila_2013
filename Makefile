all: \
	assets/style.css \
	assets/script.js \
	favicon.ico \
	apple_touch_icons \
	$(patsubst %.jpg.png, %.jpg, $(patsubst images/%, assets/%, $(shell ls images/*)))

assets/style.css: \
	assets/_attributions.css \
	assets/_reset.css \
	assets/_basic.css \
	assets/_nav.css \
	assets/_cta.css \
	assets/_title.css \
	assets/_speakers.css \
	assets/_tickets.css \
	assets/_schedule.css \
	assets/_location.css \
	assets/_about.css \
	assets/_contact.css \
	assets/_slideshow.css

	$(COMBINE)
	@# $(CONDENSE)
	
assets/script.js: \
	js/attributions.js \
	js/jquery.hidpi.js \
	js/jquery.smartquotes.js \
	js/jquery.anchorjump.js \
	js/jquery.scrollagent.js \
	js/jquery.unorphan.js \
	js/jquery.toggleable.js \
	js/cycler.js \
	js/jquery.swipeshow.js \
	js/setup.js

	$(COMBINE)

cachebust:
	perl -p -i -e "s/\?v=[0-9]+/?v=`echo $$RANDOM`/" index.html

# ----------------------------------------------------------------------------
#  Favicon building

favicon.ico: favicon.png
	$(check_imagemagick)
	$(convert) $< -resize 16x16 favicon.16.png
	$(convert) $< -resize 32x32 favicon.32.png
	$(convert) $< -resize 48x48 favicon.48.png
	$(convert) $< -resize 64x64 favicon.64.png
	$(convert) favicon.16.png favicon.32.png favicon.48.png favicon.64.png $@
	rm favicon.*.png

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

# Regular JPGs
assets/%.jpg: images/%.jpg
	$(check_imagemagick)
	$(convert) $< -strip $@

# ----------------------------------------------------------------------------
# Apple touch icons

apple_touch_icons: \
	apple-touch-icon-144x144-precomposed.png \
	apple-touch-icon-114x114-precomposed.png \
	apple-touch-icon-72x72-precomposed.png \
	apple-touch-icon-57x57-precomposed.png

apple-touch-icon-144x144-precomposed.png: apple-touch-icon-precomposed.png
	$(check_imagemagick)
	$(convert) $< -resize 144x144 $@
apple-touch-icon-114x114-precomposed.png: apple-touch-icon-precomposed.png
	$(check_imagemagick)
	$(convert) $< -resize 114x114 $@
apple-touch-icon-72x72-precomposed.png: apple-touch-icon-precomposed.png
	$(check_imagemagick)
	$(convert) $< -resize 72x72 $@
apple-touch-icon-57x57-precomposed.png: apple-touch-icon-precomposed.png
	$(check_imagemagick)
	$(convert) $< -resize 57x57 $@

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

# Reduce whitespace
CONDENSE = perl -p -i -e 's/(;|\{|,)\n/\1 /g' $@; perl -p -i -e 's/(;|\{) +/\1 /g' $@

.PHONY: start watch server all clean cachebust

PORT ?= 9110
