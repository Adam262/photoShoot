'use strict';

import { photoGallery } from './galleryService.js';

const galleries = ['portraits', 'headshots', 'kids'];
const pages = ['fullpage', 'portfolio', 'about', 'contact'];

let photos = photoGallery.homepagePhotos(),
    $document = $(document),
    $pages = $('.page'),
    $fullpageContainer = $('#fullpage'),
    $section = $('#fullpage > .section'),
    $gallery = $('.gallery'),
    $galleryHeader = $('.gallery-header'),
    $menu = $('.menu'),
    $submenu = $('.submenu'),
    $navbar = $('.navbar'),
    $footer = $('footer'),
    $logoContainer = $('.fullpage .logo-container');

function init() {
  appendSlides(photos);
  initFullpage();

  registerEvents();
  initJustifiedGallery('headshots', false);
  initDropit();
}

function registerEvents() {
  // show one page at a time when its link is clicked
  pages.forEach(page => {
    $document.on('click', `.${page}-link`, (event) => {
      event.preventDefault();

      togglePageVisibility(page);
    });
  });

  // repopulate gallery each time a link is clicked in Portfolio subheader
  galleries.forEach(gallery => {
    $submenu.on('click', `.${gallery}-link`, (event) => {
      event.preventDefault();
      
      initJustifiedGallery(gallery); 
    });
  });
}

function togglePageVisibility(page) {
   $pages.each(function() {
      $(this).hide();
      $(`.${page}`).show();

      toggleFooter(page);
    });
}

function toggleFooter(page) {
  var isFullpage = (page === 'fullpage');
  
  $footer.toggle(!isFullpage);
  $logoContainer.toggle(isFullpage);
}

function imageTag(photo, type = 'fullsize') {
  var pathToPhoto = type === 'thumbnail' ? 'thumb' : 'path';

  return `<img src='${photo[pathToPhoto]}' data-homepage='${photo.homepage}'` +  
    ` data-category='${photo.category}' class='slide ${type}'>`;        
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

function initJustifiedGallery(type = 'headshots', triggerPortfolio = true) {
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
    }
  );
  if (triggerPortfolio) {
    $('.portfolio-link').trigger('click');
  }
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
