/* hi */

/*
 * Foresight.js 2.0.0 Copyright (c) 2012, Adam Bradley
 * Available via the MIT license.
 * For details see: https://github.com/adamdbradley/foresight.js
 */(function(a,b,c,d){"use strict",a.images=[],a.options=a.options||{};var e=a.options,f=e.testConn||!0,g=e.minKbpsForHighBandwidth||300,h=e.speedTestUri||"http://foresightjs.appspot.com/speed-test/50K",i=e.speedTestKB||50,j=e.speedTestExpireMinutes||30,k=e.hiResClassname||"fs-high-resolution",l=e.lowResClassname||"fs-standard-resolution",m="devicePixelRatio",n="devicePixelRatioRounded",o="bandwidth",p="connType",q="connTestResult",r="connKbps",s="requestChange",t="defaultSrc",u="highResolutionSrc",v="browserWidth",w="browserHeight",x="requestWidth",y="requestHeight",z="width",A="height",B="widthUnits",C="heightUnits",D="aspectRatio",E="appliedImageSetItem",F="scale",G="scaleRounded",H="uriTemplate",I="uriFind",J="uriReplace",K="srcModification",L="loading",M="complete",N="fsjs",O="auto",P="percent",Q="auto",R="pixel",S="display",T="auto",U=!0,V=!1,W=/url\((?:([a-zA-Z-_0-9{}\?=&\\/.:\s]+)|([a-zA-Z-_0-9{}\?=&\\/.:\s]+)\|([a-zA-Z-_0-9{}\?=&\\/.:\s]+))\)/g,X=/[^\d]+/,Y,Z,$=function(){if(Y)return;Y=L,ba(),Y=M,bf()},_=function(a,b){if(c.createEvent){var d=c.createEvent("Event");d.initEvent("foresight-"+a,U,U),b.dispatchEvent(d)}},ba=function(){var b,d,e;for(b=0;b<c.images.length;b++){d=c.images[b];if(d.ignore)continue;if(!d.initalized){d.initalized=U,_("imageInitStart",d),d[t]=be(d,"src"),d[B]=be(d,z,U),d[C]=be(d,A,U);var f=be(d,"aspect-ratio",V);d[D]=f===O?f:!isNaN(f)&&f!==null?parseFloat(f):0;if(!d[t]){d.ignore=U;continue}d[u]=be(d,"high-resolution-src"),d.orgClassName=d.className?d.className:"",d.onerror=bs,_("imageInitEnd",d),a.images.push(d)}d.imageSetText=bm(d,"font-family","fontFamily"),d.imageSet=[],d.imageSetText.length>1&&bc(d,d.imageSetText.split("image-set(")[1])}},bb=function(b){if(b==""||typeof b==undefined)return;var d,e,f,g=c.getElementById(b),h=g.getElementsByTagName("img");for(d=0;d<h.length;d++){e=h[d];if(e.ignore)continue;e.initalized=U,_("imageInitStart",e),e[t]=be(e,"src"),e[B]=be(e,z,U),e[C]=be(e,A,U);var i=be(e,"aspect-ratio",V);e[D]=i===O?i:!isNaN(i)&&i!==null?parseFloat(i):0;if(!e[t]){e.ignore=U;continue}e[u]=be(e,"high-resolution-src"),e.orgClassName=e.className?e.className:"",e.onerror=bs,_("imageInitEnd",e),a.images.push(e),e.imageSetText=bm(e,"font-family","fontFamily"),e.imageSet=[],e.imageSetText.length>1&&bc(e,e.imageSetText.split("image-set(")[1])}},bc=function(a,b){var c,d=b!==undefined&&b!==null?b.split(","):[],e,f;for(c=0;c<d.length;c++){e={text:d[c],weight:0},e.text.indexOf(" 1.5x")>-1?(e.weight++,e[F]=1.5):e.text.indexOf(" 2x")>-1?e[F]=2:e.text.indexOf(" 1x")>-1&&(e[F]=1),e.text.indexOf(" high-bandwidth")>-1?e[o]="high":e.text.indexOf(" low-bandwidth")>-1&&(e[o]="low");while(f=W.exec(e.text))f[1]!=null&&f[1]!==""?(e[H]=f[1],e.weight++):f[2]!=null&&f[2]!==""&&(e[I]=f[2],e[J]=f[3],e.weight++);e[F]&&e[o]?e.weight+=2:(e[F]||e[o])&&e.weight++,a.imageSet.push(e)}a.imageSet.sort(bd)},bd=function(a,b){return a.weight<b.weight?1:a.weight>b.weight?-1:0},be=function(a,b,c,d){return d=a.getAttribute("data-"+b),c&&d!==null?isNaN(d)?0:parseInt(d,10):d},bf=function(){if(Z!==M||Y!==M)return;var b,c=a.images.length,d,e,f,g,h=[],i;for(b=0;b<c;b++){d=a.images[b];if(!bj(d))continue;_("imageRebuildStart",d),f=d.orgClassName.split(" "),bk(d),d.unitType==R&&(g="fs-"+d[v]+"x"+d[w],f.push(g),h[g]==undefined&&(h[g]=U,h.push("."+g+"{width:"+(d[v]>0?d[v]+"px;":"inherit;")+" height:"+(d[w]>0?d[w]+"px;":"auto;")+"}"))),d.style.display!=="inline"&&(d.style.display="inline"),bi(d),bg(d),a.hiResEnabled&&d.src!==d[t]?f.push(k):f.push(l),f.push("fs-"+d[K]),d.className=f.join(" "),_("imageRebuildEnd",d)}h.length&&bo(h),a.updateComplete&&a.updateComplete(),bw=by()},bg=function(b){var c,d;b[E][F]>1&&b[E][o]==="high"?(c=b[v]===undefined?T:Math.round(b[v]*b[E][F]),d=b[w]===undefined?T:Math.round(b[w]*b[E][F]),a.hiResEnabled=U):(c=b[v]===undefined?T:b[v],d=b[w]===undefined?T:b[w],a.hiResEnabled=V),!b[x]||c>b[x]||b.activeImageSetText!==b.imageSetText?(b[x]=c,b[y]=d,b[u]&&a.hiResEnabled?(b.src=b[u],b[K]="src-hi-res"):b.src=bh(b),b[s]=U,b.activeImageSetText=b.imageSetText):b[s]=V},bh=function(a){return a[E][H]?(a[K]="src-uri-template",bp(a)):a[E][I]&&a[E][J]?(a[K]="src-find-replace",br(a)):(a[K]="src-default",a[t])},bi=function(b){var c,d,e={};for(c=0;c<b.imageSet.length;c++){d=b.imageSet[c];if(d[F]&&d[o]){if(a[m]==d[F]&&a[o]===d[o]){e=d;break}if(Math.round(a[m])==d[F]&&a[o]===d[o]){e=d;break}}else if(d[F]){if(a[m]==d[F]){e=d;break}if(Math.round(a[m])==d[F]){e=d;break}}else if(d[o]){if(a[o]===d[o]){e=d;break}}else e=d}e[F]||(e[F]=a[m]),e[o]||(e[o]=a[o]),e[G]=Math.round(e[F]),b[E]=e},bj=function(a,b){return b=a.parentNode,b.clientWidth?U:bm(b,"display")==="inline"?bj(b):V},bk=function(a,b){if(!a.unitType){var c=a.style[S];a.style[S]="none",b=bm(a,z),a.style[S]=c,a[D]&&b==="auto"||b.indexOf("%")>0?a.unitType=P:(a.unitType=R,a[D]&&a[D]!==O?a[C]?(a[v]=Math.round(a[HEIGHT_UNTIS]/a[D]),a[w]=a[C]):(a[v]=a[B]||b.replace(X,""),a[w]=Math.round(a[v]/a[D])):(a[v]=a[B],a[w]=a[C]))}if(a.unitType===P||a[D])a.computedWidth=bl(a),a[v]=a.computedWidth,a[D]!=O?a[w]=Math.round(a[v]/a[D]):a[C]&&(a[w]=Math.round(a[C]*(a.computedWidth/a[B]))),a[w]&&d.appVersion.indexOf("MSIE")>-1&&(a.style.height=a[w]+"px")},bl=function(a){if(a.offsetWidth!==0)return a.offsetWidth;var b,c,d={},e={position:"absolute",visibility:"hidden",display:"block"};for(c in e)d[c]=a.style[c],a.style[c]=e[c];b=a.offsetWidth;for(c in e)a.style[c]=d[c];return b},bm=function(a,b,d){return d||(d=b),a.currentStyle?a.currentStyle[d]:c.defaultView.getComputedStyle(a,null).getPropertyValue(b)},bn,bo=function(a,b){bn||(bn=c.createElement("style"),bn.setAttribute("type","text/css")),b=a.join("");try{bn.innerHTML=b}catch(d){bn.styleSheet.cssText=b}bn.parentElement==null&&c.getElementsByTagName("head")[0].appendChild(bn)},bp=function(a){var b,c=["src","protocol","host","port","directory","file","filename","ext","query",x,y,F,G],d=a[E][H];a.uri=bq(a[t]),a.uri.src=a[t],a.uri[x]=a[x],a.uri[y]=a[y],a.uri[F]=a[E][F],a.uri[G]=a[E][G];for(b=0;b<c.length;b++)d=d.replace("{"+c[b]+"}",a.uri[c[b]]);return d},bq=function(a){var b={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},c=b.parser.exec(a),d={},e=14;while(e--)d[b.key[e]]=c[e]||"";d[b.q.name]={},d[b.key[12]].replace(b.q.parser,function(a,c,e){c&&(d[b.q.name][c]=e)});var f=d.file.split(".");return d.filename=f[0],d.ext=f.length>1?f[f.length-1]:"",d},br=function(a){var b=a[E][I].replace("{browserWidth}",a[B]).replace("{browserHeight}",a[C]),c,d=a[t].replace(b,a[E][J]),e=[x,y,F,G];a[F]=a[E][F],a[G]=a[E][G];for(c=0;c<e.length;c++)d=d.replace("{"+e[c]+"}",a[e[c]]);return d},bs=function(a){a=this,a.className=a.className.replace(k,l),a[K]="response-error";if(a.hasError||a.src===a[t])return;a.hasError=U,a.src=a[t]},bt=function(){if(Z)return;if(e.forcedBandwidth){a[o]=e.forcedBandwidth,a[q]="forced",Z=M;return}if(a[m]===1){a[q]="skip",Z=M;return}var b=d.connection||{type:"unknown"},f=b.type==3||b.type==4||/^[23]g$/.test(b.type);a[p]=b.type;if(f){a[q]="connTypeSlow",Z=M;return}try{var j=JSON.parse(localStorage.getItem(N));if(j!==null&&(new Date).getTime()<j.exp){a[o]=j.bw,a[r]=j.kbps,a[q]="localStorage",Z=M;return}}catch(k){}var l=c.createElement("img"),n,s,t;l.onload=function(){n=(new Date).getTime();var b=(n-s)/1e3;b=b>1?b:1,a[r]=i*1024*8/b/1024,a[o]=a[r]>=g?"high":"low",bu("networkSuccess")},l.onerror=function(){bu("networkError",5)},l.onabort=function(){bu("networkAbort",5)},s=(new Date).getTime(),Z=L,c.location.protocol==="https:"&&(h=h.replace("http:","https:")),l.src=h+"?r="+Math.random(),t=i*8/g*1e3+350,setTimeout(function(){bu("networkSlow")},t)},bu=function(b,c){if(Z===M)return;Z=M,a[q]=b;try{c||(c=j);var d={kbps:a[r],bw:a[o],exp:(new Date).getTime()+c*6e4};localStorage.setItem(N,JSON.stringify(d))}catch(e){}bf()},bv=function(){b.addEventListener?b.addEventListener("resize",bx,V):b.attachEvent&&b.attachEvent("onresize",bx)},bw=0,bx=function(){bw!==by()&&a.reload()},by=function(){return c.documentElement.clientWidth||c.body&&c.body.clientWidth||1024},bz,bA=function(){if(Y!==M||Z!==M)return;ba(),bf()};a.resolve=function(a,b){b.imageSet=[],bc(b,a),bi(b),bg(b),b.src=bh(b)},a.reload=function(){b.clearTimeout(bz),bz=b.setTimeout(bA,250)},a.ready=function(){if(!c.body)return b.setTimeout(a.ready,1);$()},a.async=function(a){if(a==""||typeof a==undefined)return;Y=L,bb(a),Y=M,bf()},c.readyState===M?setTimeout(a.ready,1):c.addEventListener?(c.addEventListener("DOMContentLoaded",a.ready,V),b.addEventListener("load",a.ready,V)):c.attachEvent&&(c.attachEvent("onreadystatechange",a.ready),b.attachEvent("onload",a.ready)),a[m]=b[m]?b[m]:1,e.forcedPixelRatio&&(a[m]=e.forcedPixelRatio),a[n]=Math.round(a[m]),bt(),bv()})(this.foresight=this.foresight||{},this,document,navigator);

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
  $(".pass-reminders li")
    .filter(":not(.no-unorphan")
    .unorphan();
});

