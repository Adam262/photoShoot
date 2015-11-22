'use strict';

import { photoGallery } from './galleryService.js';

let photos = photoGallery.allPhotos(),
    thumbnails = photoGallery.allPhotos('thumbnail'),
    $section = $('#fullpage > .section'),
    $document = $(document),
    $menu = $('.menu'),
    $navbar = $('.navbar');

    console.log(thumbnails)
function init() {
  appendSlides(photos);
  if ($section.length > 0) {
    initFullpage();
  }
  initDropit();
}

function imageTag(photo) {
  return `<img src='${photo.path}' data-homepage='${photo.homepage}'` +  
    ` data-category='${photo.category}' class='slide' >`;        
}

function appendSlides(thumbnails) {
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
    height: '12%'
  });
}

function afterDropitHide() {
  $navbar.css({
    height: '3%'
  });
}

$(document).ready(init);
