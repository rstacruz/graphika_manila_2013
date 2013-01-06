// Opnionated, simple slideshow using Cycler.js.
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
  $.fn.slideshow = function(options) {
    if (!options) options = {};

    $(this).each(function() {
      var $slideshow = $(this);
      var $container = $slideshow.find('> .slides');
      var $slides    = $container.find('> .slide');

      var width = $slideshow.width();

      // Use Cycler.
      var c = new Cycler($slides, $.extend({}, options, {
        onactivate: function(current, i, prev, j) {
          $container.animate({ left: -1 * width * i });
        }
      }));

      // Defer starting until images are loaded.
      if (options.autostart !== false)
        deferLoading($slideshow, c);

      // Bind a "next slide" button.
      $slideshow.find('.next').on('click', function(e) {
        e.preventDefault();
        if (c.enabled) c.next();
      });

      // Bind a "previous slide" button.
      $slideshow.find('.previous').on('click', function(e) {
        e.preventDefault();
        if (c.enabled) c.previous();
      });

      // Save the cycler for future use.
      $slideshow.data('slideshow', c);
    });

    return this;
  };

  function deferLoading($slideshow, c) {
    // Disabled slideshow first;
    c.enabled = false;
    $slideshow.addClass('disabled');

    var images = {
      loaded: 0,
      total: $slideshow.find('img').length
    };

    // Wait till all images are loaded...
    $slideshow.find('img').on('load', function() {
      if (++images.loaded >= images.total) {
        // The re-enable...
        console.log("[Slideshow] Loading slideshow", $slideshow);
        $slideshow.removeClass('disabled');
        c.enabled = true;

        // And start.
        c.start();
      }
    });
  }
})(jQuery);
