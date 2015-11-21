'use strict';

import photoService from './photos.js';

var PhotoShoot = PhotoShoot || {};

PhotoShoot.Config = {};

PhotoShoot.Photos = photoService();

PhotoShoot.Events = (function() {
  var $section = $('#fullpage > .section'),
      $document = $(document),
      $menu = $('.menu'),
      $navbar = $('.navbar');

  function init() {
    // globalPreventDefault();
    appendSlides(PhotoShoot.Photos);
    if ($section.length > 0) {
      initFullpage();
    }
    initDropit();
  }

  function imageTag(photo) {
    return `<img src='${photo.path}' alt='${photo.title}'` +  
      ` data-category='${photo.category}' class='slide' >`;        
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
      height: '15%'
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
