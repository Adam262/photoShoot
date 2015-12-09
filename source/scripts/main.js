'use strict';

import { photoGallery } from './galleryService.js';

const galleries = ['portraits', 'headshots', 'kids']; // move to config module?

let photos = photoGallery.homepagePhotos(),
    $fullpageContainer = $('#fullpage'),
    $section = $('#fullpage > .section'),
    $gallery = $('.gallery'),
    $galleryHeader = $('.gallery-header'),
    $document = $(document),
    $menu = $('.menu'),
    $submenu = $('.submenu'),
    $navbar = $('.navbar');

function init() {
  // init fullPage on index only
  if ($section.length > 0) {
    appendSlides(photos);
    initFullpage();
  }

  registerEvents();
  initJustifiedGallery();
  initDropit();
}

function registerEvents() {
  // repopulate gallery each time a link is clicked in Portfolio subheader
  galleries.forEach(gallery => {
    $submenu.on('click', `.${gallery}-link`, (event) => {
      event.preventDefault();
      
      initJustifiedGallery(gallery); 
    });
  });
}

function imageTag(photo, type = 'fullsize') {
  var pathToPhoto = type === 'thumbnail' ? 'thumb' : 'path';

  return `<img src='${photo[pathToPhoto]}' data-homepage='${photo.homepage}'` +  
    ` data-category='${photo.category}' class='slide ${type}'/>`;        
}

function imageAnchor(photo) {
  return `<a href='${photo.path}' class='image-anchor'>${imageTag(photo, 'thumbnail')}</a>`
}

function appendSlides(photos) {
  var tag;

  photos.forEach(photo => {
    tag = imageTag(photo);

    $section.append(tag);
  });
}

function createGallery(type) {
  var $existingAnchors = $('.image-anchor'),
      tag,
      photos;

  photos = photoGallery.photosByCategory(type);

  setGalleryHeader(type.toUpperCase());
  $existingAnchors.remove();    

  photos.forEach(photo => {
    tag = imageAnchor(photo);

    $gallery.append(tag);
  });
}

function setGalleryHeader(text) {
  $galleryHeader.text(text)
}

function globalPreventDefault() {
  $document.on('click', 'a', function(event) {
    event.preventDefault();
  });
}

function initFullpage() {
  $fullpageContainer.fullpage({
    resize: false,
    scrollingSpeed: 2000,
    easing: 'easeOutSine',
    controlArrows: false,
    afterLoad: setInterval(function(){ $.fn.fullpage.moveSlideRight() }, 2000)
  });
}

function initJustifiedGallery(type = 'headshots') {
  createGallery(type);

  $gallery.justifiedGallery({ margins: 25, rowHeight: 180 }).
    on('jg.complete', function() {
      $(this).find('a').colorbox({
        maxWidth : '80%',
        maxHeight : '80%',
        opacity : 0.8,
        transition : 'elastic',
        scrolling : false,
        current : ''
      });
    })
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

$(document).ready(init);
