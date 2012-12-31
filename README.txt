How it works
------------

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
