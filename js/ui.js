
$('.impressum, .contact').click(function(e) {
  if (!$(e.delegateTarget).hasClass('expand')) {
    //$(e.delegateTarget).scrollToMe();
  }
  if (!$(e.target).is('a')) {
    $(e.delegateTarget).toggleClass('expand');
  }

});

$('.burger').click(function() {
  $('body').toggleClass('show-menu');
});

var header = $('header');
var headerIsMini = false;

$(window).bind('touchmove scroll', function() {
  var top = $(this).scrollTop();

  if (top > 30) {
    if (!headerIsMini) {
      header.addClass('mini');
      headerIsMini = true;
    }
  } else {
    if (headerIsMini) {
      header.removeClass('mini');
      headerIsMini = false;
    }
  }
});

$(function() {
  FastClick.attach(document.body);
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$('a[href*="#contact"]').click(function() {
  $('#contact').addClass('expand');
});

$('header nav a').click(function() {
  $('body').removeClass('show-menu');
});

jQuery.fn.extend({
  scrollToMe: function () {
    var x = jQuery(this).offset().top - 100 + 'px';
    jQuery('html,body').animate({scrollTop: x}, 1000);
  }});

$('nav a.contact').click(function() {
  $('footer .contact').scrollToMe();
});
