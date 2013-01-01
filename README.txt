Dev notes
---------

 * Edit `index.html` as you would any HTML.

 * You can edit Stylus source files in `css/` - they get compiled to CSS by the make tool.

 * JavaScripts are in `js/` - they get combined using the make tool.

 * The list of JavaScript files are in the `Makefile`.

 * Raw images are all in .png and are stored in `images/`. They get
   auto-optimized under `assets/` using the make tool.

 * For retina images, save them as `images/hello@2x.jpg.png` (for jpegs) or
   `images/hello@2x.png` (for PNGs). They will get auto-scaled down using the make tool.

 * To use retina images in `<img>`, use `<img data-src="hello.jpg">`. The `@2x`
   suffix will be added automatically on retina systems.

To use the Make tool
--------------------

The make tool builds optimized assets (in `assets/`) from source files (in
`images/`, `css/` and `js/`). GNU Make already comes pre-installed in most
systems, but you need a few more things.

In OSX:

 * Install homebrew (http://mxcl.github.com/homebrew)
 * Install NodeJS (brew install nodejs) - needed for Stylus
 * Install Optipng (brew install optipng) - needed to optimize PNG
 * Install ImageMagick (brew install imagemagick) - needed to auto-scale retina images
 * Install Stylus+Nib (sudo npm install -g stylus nib) - needed to compile CSS

Then:

 * Type `make start` in a Terminal

Asset compilation: How it works
-------------------------------

There's a make script (`Makefile`) that takes care of processing your CSS, JS and images.
Just type `make` and they will be generated. In general:

 * Raw, unprocessed things go into `images/`, `css/` and `js/`
 * Type `make` in the Terminal
 * Things will be processed into `assets/`.

Images
------

Put images in `images/`. **All PNG files, please.**

 * The non-retina PNGs will be automatically created from retina PNGs.
 * PNGs will be optimized for filesize automatically.
 * JPG saving will automatically strip EXIF and optimize, progressive-style
 * `XXX@2x.jpg.png` will be converted to `XXX@2x.jpg` and rescaled to `XXX.jpg` too
 * `XXX@2x.png` will be optimized to `XXX@2x.png` and rescaled to `XXX.png` too
 * `XXX.jpg.png` will be converted to `XXX.jpg` with the optimal settings
 * `XXX.png` will optimized to `XXX.png`


JavaScript
----------

Put JS in `js/`. Edit the Makefile to change the order of how they're baked into script.js.

CSS / Stylus
------------

CSS is powered by Stylus + Nib. The `.styl` files will automatically be converted to `.css`.

See http://learnboost.github.com/stylus for more info.
