$(document).ready(function() {

  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the
      //nav bar to stick.
      console.log($(window).scrollTop())
    if ($(window).scrollTop() > $("#banner").height()) {
      $('#navbar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < $("#banner").height() + 1) {
      $('#navbar').removeClass('navbar-fixed');
    }
  });
});