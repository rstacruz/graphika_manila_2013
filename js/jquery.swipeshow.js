/*! Swipeshow (c) 2013 Rico Sta. Cruz, MIT license. */

// Opnionated, touch-enabled simple slideshow using Cycler.js.
//
// <div class="slideshow">
//   <ul class="slides">
//     <li class="slide"> ... </il>
//     <li class="slide"> ... </li>
//     <li class="slide"> ... </li>
//   </ul>
//
//   <!-- optional controls: -->
//   <button class="next"></button>
//   <button class="previous"></button>
// </div>

(function($) {
  $.fn.swipeshow = function(options) {
    if (!options) options = {};

    $(this).each(function() {
      var $slideshow = $(this);
      var $container = $slideshow.find('> .slides');
      var $slides    = $container.find('> .slide');

      var width = $slideshow.width();

      // Use Cycler.
      var c = new Cycler($slides, $.extend({}, options, {
        onactivate: function(current, i, prev, j) {
          setOffset($container, -1 * width * i);
        }
      }));

      // Defer starting until images are loaded.
      if (options.autostart !== false)
        deferLoading($slideshow, c);

      // Bind
      bindSwipe($slideshow, $container, c);

      // Bind a "next slide" button.
      $slideshow.find('.next').on('click', function(e) {
        e.preventDefault();
        if (!c.disabled) c.next();
      });

      // Bind a "previous slide" button.
      $slideshow.find('.previous').on('click', function(e) {
        e.preventDefault();
        if (!c.disabled) c.previous();
      });

      // Save the cycler for future use.
      $slideshow.data('slideshow', c);
    });

    return this;
  };

  // Defer starting of slideshow until images are fully loaded.
  function deferLoading($slideshow, c) {
    // Disabled slideshow first;
    c.disabled = true;
    $slideshow.addClass('disabled');

    var images = {
      loaded: 0,
      total: $slideshow.find('img').length
    };

    // Wait till all images are loaded...
    $slideshow.find('img').on('load', function() {
      if (++images.loaded >= images.total) {
        // The re-enable...
        $slideshow.removeClass('disabled');
        c.disabled = false;

        // And start.
        c.start();
      }
    });
  }

  // Use transitions?
  var transitions = true;

  function setOffset($el, left, instant) {
    $el.data('swipeshow:left', left);
    if (transitions) {
      if (instant) {
        $el.css({ transform: 'translate3d('+left+'px,0,0)', transition: 'none' });
      } else {
        $el.css({ transform: 'translate3d('+left+'px,0,0)', transition: 'all 300ms ease' });
      }
    } else {
      if (instant) {
        $el.css({left: left});
      } else {
        $el.animate({left: left});
      }
    }
  }

  function getOffset($el) {
    return $el.data('swipeshow:left') || 0;
  }

  // Binds swiping behavior.
  function bindSwipe($slideshow, $container, c) {
    var moving = false;
    var origin;
    var start;
    var timestart;

    var width = $slideshow.width();
    var length = c.list.length;
    var friction = 0.1;

    $container.on('mousedown touchstart', function(e) {
      // Only prevent mouse clicks. This allows vertical scrolling on mobile.
      // Do this before the sanity checks... you don't want the user to
      // accidentally drag the <img>.
      if (e.type === 'mousedown')
        e.preventDefault();

      if (c.disabled) return;
      if ($container.is(':animated')) return;

      c.pause();

      moving = true;
      origin = { x: getX(e) };
      start  = { x: getOffset($container) };

      timestart = +new Date();
    });

    $('body').on('mousemove touchmove', function(e) {
      if (c.disabled) return;
      if ($container.is(':animated')) return;
      if (!moving) return;

      // Only prevent mouse clicks. This allows vertical scrolling on mobile.
      if (e.type === 'mousedown')
        e.preventDefault();

      var delta = getX(e) - origin.x;
      var target = start.x + delta;
      var max = -1 * width * (length - 1);

      // Have some friction when scrolling out of bounds.
      if (target > 0) target *= friction;
      if (target < max) target = max + (target - max) * friction;

      setOffset($container, target, true);
    });

    $('body').on('mouseup touchend', function(e) {
      if (c.disabled) return;
      if ($container.is(':animated')) return;
      if (!moving) return;

      var left  = getOffset($container);

      // Account for velocity.
      var delta = getX(e) - origin.x;
      var duration = +new Date() - timestart;
      var coef = 9 * Math.max(0, 300 - duration) / 300;

      // Find out what slide it stopped to.
      var index = -1 * Math.round(left / width);
      if (index < 0) index = 0;
      if (index > c.list.length-1) index = c.list.length-1;
      console.log('=> stopped at', left, index);

      // Switch to that slide.
      c.goTo(index);

      // Restart the slideshow.
      e.preventDefault();
      c.start();
      moving = false;
    });

  }

  // Extracts the X from given event object. Works for mouse or touch events.
  function getX(e) {
    if (e.changedTouches)
      return e.changedTouches[0].pageX;

    if (e.clientX)
      return e.clientX;
  }
})(jQuery);
