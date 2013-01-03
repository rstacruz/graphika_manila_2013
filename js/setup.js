
/* Navigation sticky thing */
;(function() {
  var active = true;
  var threshold = 500;

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
  var threshold = 900;

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
  var isMobile = navigator.userAgent.match(/iPhone|iPad|iPod/);
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
$(".speaker").toggleable({ using: '.button, h3, .image' });
