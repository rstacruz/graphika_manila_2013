
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
