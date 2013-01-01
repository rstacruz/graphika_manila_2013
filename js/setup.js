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

    else if (active && y < 200) {
      active = false;
      $("#navigation").removeClass("stuck");
    }
  });

  $(function() {
    $(window).trigger('restuck');
  });
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
$("#navigation a").anchorjump();

$(function() {
  $(".pass-reminders li, .pass-contents li strong")
    .filter(":not(.no-unorphan)")
    .unorphan();

  $("p, li", ".location, .about")
    .unorphan();
});


$(function() {
  $("img[data-src]").hidpi();
});
