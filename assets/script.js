/* hi */

/*! jquery.hidpi (c) 2012, Rico Sta. Cruz. MIT License.
 *   http://github.com/rstacruz/jquery-stuff/tree/master/hidpi */

// Adds retina (High DPI) support to images.
//
// This example loads `hello.jpg` in most system's, but uses `hello@2x.jpg`
// on systems that support hi-DPI.
//
//     <img data-src="hello.jpg">
//
//     $(function() {
//       $('img[data-src]').hidpi();
//     });
//
// This also adds the `jQuery.support.hidpi` variable for checking for hidpi support in JS.
//
// Be sure to specify the dimensions of the image!
//
//     <img data-src="hello.jpg" width="40" height="40" alt="Hello">
//
// or you can do it in CSS... either way, the dimensions are required to be specified.
//
//     <img data-src="hello.jpg" class="hello">
//
//     img.hello { width: 40px; height: 40px; }
//
(function($, w, devicePixelRatio15) {
  $.support.hidpi = isHiDPI();

  $.fn.hidpi = function() {
    this.each(function() {
      var $img  = $(this);
      var src   = $(this).data('src');
      var hiSrc = src.replace(/\.[^\.]*$/, function(ext) { return "@2x" + ext; });

      $(this).attr('src', $.support.hidpi ? hiSrc : src);
    });
  };

  // Thanks https://github.com/imulus/retinajs/blob/master/src/retina.js
  // The repetitive parts of the string are put in a variable so JS compressors
  // can optimize them away.
  function isHiDPI() {
    var query =
      "(-webkit-min" + devicePixelRatio15 +
      "(min--moz" + devicePixelRatio15 +
      "(-ms-min" + devicePixelRatio15 +
      "(-o-min" + devicePixelRatio15 +
      "(min" + devicePixelRatio15 +
      "(min-resolution: 1.5dppx)";

    if (w.devicePixelRatio && w.devicePixelRatio > 1)
      return true;

    if (w.matchMedia && w.matchMedia(query).matches)
      return true;

    return false;
  }

})(jQuery, this, '-device-pixel-ratio: 1.5),');

/*! Smartquotes (c) 2012, Rico Sta. Cruz. MIT License.
 *  http://github.com/rstacruz/jquery-stuff/tree/master/smartquotes */

// Translates plain ASCII punctuation characters into typographic punctuation
// HTML entities. Inspired by Smartypants.
//
//     $(function() {
//       $("body").smartquotes();
//     });
//
(function($) {
  // http://www.leancrew.com/all-this/2010/11/smart-quotes-in-javascript/
  $.smartquotes = function(a) {
    if (!a.match(/"|'|\.\.\.|--/)) return a;

    a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
    a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
    a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
    a = a.replace(/"/g, "\u201d");                            // closing doubles
    a = a.replace(/\.\.\./g, "\u2026");                       // ellipses
    a = a.replace(/--/g, "\u2014");                           // em-dashes
    return a;
  };

  // http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
  function getTextNodesIn(el) {
    return $(el).find(":not(iframe,pre,code)").andSelf().contents().filter(function() {
      return this.nodeType == 3;
    });
  }

  $.fn.smartquotes = function(fn) {
    if (!fn) fn = $.smartquotes;

    var nodes = getTextNodesIn(this);
    for (var i in nodes) {
      if (nodes.hasOwnProperty(i)) {
        var node = nodes[i];

        if (typeof node.nodeValue === "string" && !node.nodeValue.match(/^\s*$/))
          node.nodeValue = fn(node.nodeValue);
      }
    }
  };
})(jQuery);
/*! Anchorjump (c) 2012, Rico Sta. Cruz. MIT License.
 *   http://github.com/rstacruz/jquery-stuff/tree/master/anchorjump */

// Makes anchor jumps happen with smooth scrolling.
//
//    $("#menu a").anchorjump();
//    $("#menu a").anchorjump({ offset: -30 });
//
//    // Via delegate:
//    $("#menu").anchorjump({ for: 'a', offset: -30 });
//
// You may specify a parent. This makes it scroll down to the parent.
// Great for tabbed views.
//
//     $('#menu a').anchorjump({ parent: '.anchor' });
//
// You can jump to a given area.
//
//     $.anchorjump('#bank-deposit', options);

(function($) {
  var defaults = {
    'speed': 500,
    'offset': 0,
    'for': null,
    'parent': null
  };

  $.fn.anchorjump = function(options) {
    options = $.extend({}, defaults, options);

    if (options['for']) {
      this.on('click', options['for'], onClick);
    } else {
      this.on('click', onClick);
    }

    function onClick(e) {
      var $a = $(e.target).closest('a');
      if (e.ctrlKey || e.metaKey || e.altKey || $a.attr('target')) return;

      e.preventDefault();
      var href = $a.attr('href');

      $.anchorjump(href, options);
    }
  };

  // Jump to a given area.
  $.anchorjump = function(href, options) {
    options = $.extend({}, defaults, options);

    var top = 0;

    if (href != '#') {
      var $area = $(href);
      // Find the parent
      if (options.parent) {
        var $parent = $area.closest(options.parent);
        if ($parent.length) { $area = $parent; }
      }
      if (!$area.length) { return; }

      // Determine the pixel offset; use the default if not available
      var offset =
        $area.attr('data-anchor-offset') ?
        parseInt($area.attr('data-anchor-offset'), 10) :
        options.offset;

      top = Math.max(0, $area.offset().top + offset);
    }

    $('html, body').animate({ scrollTop: top }, options.speed);
    $('body').trigger('anchor', href);

    // Add the location hash via pushState.
    if (window.history.pushState) {
      window.history.pushState({ href: href }, "", href);
    }
  };
})(jQuery);
/*! jQuery.scrollagent (c) 2012, Rico Sta. Cruz. MIT License.
 *  https://github.com/rstacruz/jquery-stuff/tree/master/scrollagent */

// Call $(...).scrollagent() with a callback function.
//
// The callback will be called everytime the focus changes.
//
// Example:
//
//      $("h2").scrollagent(function(cid, pid, currentElement, previousElement) {
//        if (pid) {
//          $("[href='#"+pid+"']").removeClass('active');
//        }
//        if (cid) {
//          $("[href='#"+cid+"']").addClass('active');
//        }
//      });

(function($) {

  $.fn.scrollagent = function(options, callback) {
    // Account for $.scrollspy(function)
    if (typeof callback === 'undefined') {
      callback = options;
      options = {};
    }

    var $sections = $(this);
    var $parent = options.parent || $(window);

    // Find the top offsets of each section
    var offsets = [];
    $sections.each(function(i) {
      var offset = $(this).attr('data-anchor-offset') ?
        parseInt($(this).attr('data-anchor-offset'), 10) :
        (options.offset || 0);

      offsets.push({
        top: $(this).offset().top + offset,
        id: $(this).attr('id'),
        index: i,
        el: this
      });
    });

    // State
    var current = null;
    var height = null;
    var range = null;

    // Save the height. Do this only whenever the window is resized so we don't
    // recalculate often.
    $(window).on('resize', function() {
      height = $parent.height();
      range = $(document).height();
    });

    // Find the current active section every scroll tick.
    $parent.on('scroll', function() {
      var y = $parent.scrollTop();
      y += height * (0.3 + 0.7 * Math.pow(y/range, 2));

      var latest = null;

      for (var i in offsets) {
        if (offsets.hasOwnProperty(i)) {
          var offset = offsets[i];
          if (offset.top < y) latest = offset;
        }
      }

      if (latest && (!current || (latest.index !== current.index))) {
        callback.call($sections,
          latest ? latest.id : null,
          current ? current.id : null,
          latest ? latest.el : null,
          current ? current.el : null);
        current = latest;
      }
    });

    $(window).trigger('resize');
    $parent.trigger('scroll');

    return this;
  };

})(jQuery);
/*! Unorphan (c) 2012, Rico Sta. Cruz. MIT License.
 *   http://github.com/rstacruz/jquery-stuff/tree/master/unorphan */

(function($) {
  $.fn.unorphan = function() {
    $(this).each(function() {
      var last = this.lastChild;

      if ((last) && (last.nodeType == 3)) {
        var text     = last.nodeValue;
        var stripped = text.replace(/^\s*|\s*$/g, ' ');
        var spaces   = stripped.match(/ /g).length;

        if (spaces > 1) {
          last.nodeValue = last.nodeValue.replace(/\s*([^\s]+\s*)$/g, '\xA0$1');
        }
      }
    });
    return this;
  };
})(jQuery);
/*! jQuery.toggleable (c) 2012, Rico Sta. Cruz. MIT License.
 *  https://github.com/rstacruz/jquery-stuff/tree/master/toggleable */

// Makes a certain element a toggle-to-activate thing. Clicking the button
// (the selector defined in `using`) will toggle the 'active' class for both
// the button and the parent element.
//
//     $("nav.dropdown").toggleable({ using: "a.button", [options] });
//
// Options:
//
// - `sticky` - Defaults to false.
// - `modal` - Close others when this is opened. Defaults to true.
// - `clickout` - Allow clicking away. Default to true.

(function($) {
  $.fn.toggleable = function(options) {
    if (!options) options = {};

    if (typeof options.modal === 'undefined') options.modal = true;
    if (typeof options.clickout === 'undefined') options.clickout = true;
    var $menus = this;
    var button = options.using;

    $menus.on('active:off', function() {
      $(this)
        .removeClass('active')
        .find(button).removeClass('active');
    });

    $menus.on('active:on', function() {
      $(this)
        .addClass('active')
        .find(button).addClass('active');
    });

    // Button
    $menus.on('click', button, function(e) {
      // Prevent the body handler from working.
      e.preventDefault();
      e.stopPropagation();

      if ($(this).is('.active')) {
        $(this).closest($menus).trigger('active:off');
      } else {
        // Clear out any other popup first.
        if (options.modal) { $('body').trigger('click'); }
        $(this).closest($menus).trigger('active:on');
      }
    });

    $('body').on('click', function(e) {
      if (!options.clickout) { return; }

      // If sticky is true, don't dismiss the popup when the menu items
      // are clicked.
      if (options.sticky) {
        var isMenuItem = $(e.target).closest($menus).length > 0;
        if (isMenuItem) { return; }
      }

      $menus.trigger('active:off');
    });

    return this;
  };

})(jQuery);
/*! Cycler (c) 2012 Rico Sta. Cruz, MIT license. */

// Cycles between a given `list` at a given `interval`.
// Simply define an `onactivate` hook.
//
// All the options are optional except `onactivate`.
//
//     c = new Cycler(list, {
//       interval: 3000,
//       initial: 0, /* first slide's index */
//       onactivate: function(current, index, prev, prevIndex) { ... }, /* Required */
//       onstart: function() { ... },
//       onpause: function() { ... }
//     });
//
// Slideshow example
// -----------------
//
// The most common usecase of Cycler is to make your own carousel/slideshow
// implementation. Here's how you might make one:
//
//     var $parent = $(".slideshow");
//     var $images = $parent.find("img");
//
//     var c = new Cycler($images, {
//       interval: 5000,
//       onactivate: function(current) {
//         $images.hide();
//         $(current).show();
//       }
//     });
//
//     // Custom controls example
//     $parent.find("button.next").on("click", function() { c.next(); });
//     $parent.find("button.prev").on("click", function() { c.previous(); });
//
//     // Pause on hover example
//     $parent.on("hover", function() { c.pause(); }, function() { c.start(); });
//
// Navigating
// ----------
//
// You can switch by slides using `next()`, `previous()` and `goTo()`. When
// these are invoked, the interval timer is reset (that is, it will take 3000ms
// again to switch to the next slide).
//
// If these are called when the slideshow is paused, it should remain paused.
//
// Doing this will trigger the `onactivate` callback.
//
//     c.next();
//     c.previous();
//     c.goTo(0);
//
// The onactivate hook
// -------------------
//
// This is where the magic happens. It's called everytime a new slide is activated.
//
// The callback takes 4 arguments: the current list item (`current`) + its
// index in the list (`index`), and the previous item (`prev`) + its index (`prevIndex`).
//
//     var list = [ 'Apple', 'Banana', 'Cherry' ];
//
//     new Cycler(list, {
//       onactivate: function(current, index, prev, prevIndex) {
//         console.log("Switching from", prev, "to", current);
//         console.log("(from", prevIndex, "to", index, ")");
//       };
//     });
//
//     // Result:
//     //
//     // Switching from null to "Apple" (from null to 0)
//     // Switching from "Apple" to "Banana" (from 0 to 1)
//     // Switching from "Banana" to "Cherry" (from 1 to 2)
//     // Switching from "Cherry" to "Apple" (from 2 to 0)
//
// Pausing
// -------
//
// You can pause and unpause the slideshow with `pause()` and `start()`. Note
// that calling `start()` will reset the interval timer.
//
// These will call the `onpause` and `onstart` callbacks respectively.
//
//     c.pause();
//     c.start();
//
// You can pass `true` as an argument (eg, `c.pause(true)`) to these to supress
// triggering the callbacks.
//
// Properties
// ----------
//
//     c.current    /* Numeric index of current item */
//     c.list       /* The list being cycled */
//
// Chainability
// ------------
//
// All the methods are chainable, too, so you can do:
//
//     c.next().pause();

(function() {
  function Cycler(list, options) {
    this.interval   = options.interval || 3000;
    this.onactivate = options.onactivate || (function(){});
    this.onpause    = options.onpause || (function(){});
    this.onstart    = options.onstart || (function(){});
    this.initial    = (typeof options.initial === 'undefined') ? 0 : options.initial;
    this.autostart  = (typeof options.initial === 'undefined') ? true : options.autostart;
    this.list       = list;
    this.current    = null;

    this.goTo(this.initial);
    if (this.autostart && typeof options.interval === 'number') this.start();

    return this;
  }

  Cycler.prototype = {
    start: function(silent) {
      var self = this;
      if ((!self._timer) && (!silent)) self.onstart.apply(self);

      self.pause(true);
      self._timer = setTimeout(function() {
        self.next();
      }, self.interval);
      return self;
    },

    pause: function(silent) {
      if (this._timer) {
        if (!silent) this.onpause.apply(this);
        clearTimeout(this._timer);
        this._timer = null;
      }
      return this;
    },

    // Delays the interval a bit
    restart: function(silent) {
      if (this._timer) this.pause(true).start(silent);
      return this;
    },

    previous: function() {
      return this.next(-1);
    },

    next: function(i) {
      if (typeof i === 'undefined') i = 1;

      var len = this.list.length;
      if (len === 0) return this;

      // Get the index of the new item
      var idx = (this.current + i + len*2) % len;

      return this.goTo(idx);
    },

    goTo: function(idx) {
      if (typeof idx !== 'number') return this;

      var prev = this.current;
      this.current = idx;

      this.onactivate.call(this, this.list[idx], idx, this.list[prev], prev);
      this.restart(true);
      return this;
    }
  };

  window.Cycler = Cycler;
})();
/*! onloadall (c) 2012, Rico Sta. Cruz. MIT License.
 *   http://github.com/rstacruz/jquery-stuff/tree/master/anchorjump */

// Performs something when all of the images have loaded.
//
//     $('img').onloadall(function() {
//       this.show();
//     });
//
(function($) {
  $.fn.onloadall = function(callback) {
    var $images = this;

    var images = {
      loaded: 0,
      total: $images.length
    };

    // Wait till all images are loaded...
    $images.on('load onloadall:load', function() {
      if (++images.loaded >= images.total) { callback.apply($images); }
    });

    $(function() {
      $images.each(function() {
        if (this.complete) $(this).trigger('onloadall:load');
      });
    });

    return this;
  };
})(jQuery);

/* Navigation sticky thing */
;(function() {
  var active = true;
  var threshold = 500 + 300;

  $(window).on('scroll restuck', function() {
    var y = $(window).scrollTop();

    if (!active && y > threshold) {
      active = true;
      $("#navigation").addClass("stuck");
    }
    else if (active && y < threshold) {
      active = false;
      $("#navigation").removeClass("stuck");
    }
  });

  $(function() { $(window).trigger('restuck'); });
})();

/* Animation */
;(function() {
  var active = false;
  var threshold = 900 + 500;

  $(window).on('scroll reanimate', function() {
    var y = $(window).scrollTop();

    if (!active && y < threshold) {
      active = true;
      $(".section.title").addClass("moving");
    }
    else if (active && y > threshold) {
      active = false;
      $(".section.title").removeClass("moving");
    }
  });

  $(function() { $(window).trigger('reanimate'); });
})();


/* Highlight as you go along */
$("section.section").scrollagent(function(cid, pid) {
   if (pid) {
     $("[href='#"+pid+"']").removeClass('active');
   }
   if (cid) {
     $("[href='#"+cid+"']").addClass('active');
   }
});

/* Jumping */
$("[href^='#']").anchorjump();

/* Unorphan */
$(function() {
  $(".pass-reminders li, .pass-contents li strong")
    .filter(":not(.no-unorphan)")
    .unorphan();

  $("p, li", ".location, .about").unorphan();
  $(".faq li strong").unorphan();
});

/* Mobile switch */
$(function() {
  var isMobile = navigator.userAgent.match(/iPhone|iPad|iPod|Android/);
  $("html").addClass(isMobile ? "mobile" : "desktop");
});

/* Retina support */
$(function() {
  $("img[data-src]").hidpi();
});

/* Smartquotes - typographic punctuation */
$(function() {
  $("body").smartquotes();
});

/* Speakers - click to toggle */
$(".speaker").toggleable({ using: '.button, h3, p' });

/* Naive slideshow impementation */
$(".slideshow").each(function() {
  var $slideshow = $(this);
  var $container = $slideshow.find('> .slides');
  var $slides    = $container.find('> .slide');
  var speed = 500;

  $slideshow.find('img').onloadall(function() {
    var c = new Cycler($slides, {
      interval: 4000 + Math.random() * 3000,
      onactivate: function(current, i, prev, j) {
        if (prev) {
          $(prev).css({
            zIndex: 1, opacity: 1, transition: 'none'
          }).show();
        }

        $(current)
          .css({
            position: 'absolute', top: 0, left: 0,
            zIndex: 2, opacity: 0, transition: 'none'
          }).show();

        setTimeout(function() {
          $(current).css({
            opacity: 1, transition: 'opacity '+speed+'ms linear'
          });
        }, 0);

        setTimeout(function() {
          $(prev).hide();
        }, speed);
      }
    });
  });
});

/* Call for entries */
$(function() {
  var $section = $('#call-for-entries');
  $section.show();

  var height = $section.outerHeight();

  if ($(window).scrollTop() === 0)
    $(window).scrollTop(height);
});
