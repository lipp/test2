
$('.newsletter, .contact').click(function(e) {
  $(e.delegateTarget).toggleClass('expand');
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
