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

      // Bind a "next slide" button.
      $slideshow.find('.next').on('click', function(e) {
        e.preventDefault();
        c.next();
      });

      // Bind a "previous slide" button.
      $slideshow.find('.previous').on('click', function(e) {
        e.preventDefault();
        c.previous();
      });

      // Save the cycler for future use.
      $slideshow.data('slideshow', c);
    });

    return this;
  };
})(jQuery);
