var PhotoShoot = PhotoShoot || {};

PhotoShoot.Config = {};

PhotoShoot.Photos = (function() {
  var photos;

  function Photo(path, category, title) {
    this.path = path;
    this.category = category;
    this.title = title || 'title';
  }

  photos = [
    new Photo('./assets/nyh-site-coverpage-5.jpg', 'A'),
    new Photo('./assets/nyh-site-coverpage-6.jpg', 'B'),
    new Photo('./assets/nyh-site-coverpage-7.jpg', 'C'),
    new Photo('./assets/nyh-site-coverpage-8.jpg', 'A'),
    new Photo('./assets/nyh-site-coverpage-9.jpg', 'B'),
    new Photo('./assets/nyh-site-coverpage-12.jpg', 'A')
  ]

  return photos;
}());

PhotoShoot.Events = (function() {
  var $section = $('#fullpage > .section'),
      $document = $(document),
      $menu = $('.menu'),
      $navbar = $('.navbar');

  function init() {
    globalPreventDefault();
    appendSlides(PhotoShoot.Photos);
    initFullpage();
    initDropit();
  }

  function imageTag(photo) {
    return '<img src=' + photo.path + ' alt=' + photo.title + 
      ' data-category=' + photo.category + " class='slide'" + '>';        
  }

  function appendSlides(photos) {
    var tag;

    photos.forEach(function(photo) {
      tag = imageTag(photo);

      $section.append(tag);
    });
  }

  function globalPreventDefault() {
    $document.on('click', 'a', function(event) {
      event.preventDefault();
    });
  }

  function initFullpage() {
    $('#fullpage').fullpage({
      resize: false,
      scrollingSpeed: 2000,
      easing: 'easeOutSine',
      controlArrows: false,
      afterLoad: setInterval(function(){ $.fn.fullpage.moveSlideRight() }, 2000)
    });
  }

  function initDropit() {
    $menu.dropit({
      action: 'mouseenter',
      beforeShow: beforeDropitShow,
      afterHide: afterDropitHide
    });
  }

  function beforeDropitShow() {
    $navbar.css({
      height: '10%'
    });
  }

  function afterDropitHide() {
    $navbar.css({
      height: '3%'
    });
  }

  return { init: init }; 
}());

$(document).ready(PhotoShoot.Events.init);