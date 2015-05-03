$(document).ready(function(){
    $('#fullpage').fullpage(
      {
        resize: false,
        scrollingSpeed: 2000,
        easing: 'easeOutSine',
        controlArrows: false,
        afterLoad: setInterval(function(){ $.fn.fullpage.moveSlideRight() }, 2000)
      }
    );
  }
);