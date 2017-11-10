$(document).ready(function() {

  $(window).scroll(function () {
    // Fixes the position of the navbar if you scroll past the banner
    if ($(window).scrollTop() > $("#bannerwrap").height()) {
      $('#navbar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < $("#bannerwrap").height() + 1) {
      $('#navbar').removeClass('navbar-fixed');
    }
  });
});
