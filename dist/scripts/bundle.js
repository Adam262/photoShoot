(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photoGallery = undefined;

var _photoService = require('./photoService.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var photoGallery = undefined;

var Gallery = (function () {
  function Gallery() {
    _classCallCheck(this, Gallery);
  }

  _createClass(Gallery, [{
    key: 'allPhotos',
    value: function allPhotos() {
      return _photoService.allPhotos;
    }
  }, {
    key: 'homepagePhotos',
    value: function homepagePhotos() {
      return _photoService.allPhotos.filter(function (photo) {
        return photo['homepage'] === true;
      });
    }
  }, {
    key: 'photosByCategory',
    value: function photosByCategory(category) {
      return _photoService.allPhotos.filter(function (photo) {
        return photo['category'] === category;
      });
    }
  }]);

  return Gallery;
})();

exports.photoGallery = photoGallery = new Gallery();

exports.photoGallery = photoGallery;

},{"./photoService.js":3}],2:[function(require,module,exports){
'use strict';

var _galleryService = require('./galleryService.js');

var galleries = ['portraits', 'headshots', 'kids'];

var photos = _galleryService.photoGallery.homepagePhotos(),
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
  galleries.forEach(function (gallery) {
    $submenu.on('click', '.' + gallery + '-link', function (event) {
      event.preventDefault();

      initJustifiedGallery(gallery);
    });
  });
}

function imageTag(photo) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? 'fullsize' : arguments[1];

  var pathToPhoto = type === 'thumbnail' ? 'thumb' : 'path';

  return '<img src=\'' + photo[pathToPhoto] + '\' data-homepage=\'' + photo.homepage + '\'' + (' data-category=\'' + photo.category + '\' class=\'slide\'/>');
}

function imageAnchor(photo) {
  return '<a href=\'' + photo.path + '\' class=\'thumbnail\'>' + imageTag(photo, 'thumbnail') + '</a>';
}

function appendSlides(photos) {
  var tag;

  photos.forEach(function (photo) {
    tag = imageTag(photo);

    $section.append(tag);
  });
}

function createGallery(type) {
  var $existingThumbs = $('.thumbnail'),
      tag,
      photos;

  photos = _galleryService.photoGallery.photosByCategory(type);

  setGalleryHeader(type.toUpperCase());
  $existingThumbs.remove();

  photos.forEach(function (photo) {
    tag = imageAnchor(photo);

    $gallery.append(tag);
  });
}

function setGalleryHeader(text) {
  $galleryHeader.text(text);
}

function globalPreventDefault() {
  $document.on('click', 'a', function (event) {
    event.preventDefault();
  });
}

function initFullpage() {
  $fullpageContainer.fullpage({
    resize: false,
    scrollingSpeed: 2000,
    easing: 'easeOutSine',
    controlArrows: false,
    afterLoad: setInterval(function () {
      $.fn.fullpage.moveSlideRight();
    }, 2000)
  });
}

function initJustifiedGallery() {
  var type = arguments.length <= 0 || arguments[0] === undefined ? 'headshots' : arguments[0];

  createGallery(type);

  $gallery.justifiedGallery();
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

},{"./galleryService.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var imageRegex = /(.jpg|.png|.gif|.tiff)/;

var allPhotos;

var Photo = function Photo(path, category) {
  var homepage = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var thumb = arguments[3];

  _classCallCheck(this, Photo);

  this.path = path;
  this.category = category;
  this.homepage = homepage;
  this.thumb = thumb || toThumbnail(path);
};

;

function toThumbnail(path) {
  var format = getFileExtension(path),
      thumbPlusFormat = '-thumb' + format;

  return path.replace(imageRegex, thumbPlusFormat);
}

function getFileExtension(path) {
  var index = path.search(imageRegex);

  return path.slice(index);
}

exports.allPhotos = allPhotos = [new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'portraits', true), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'headshots'), new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'kids', true), new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'portraits'), new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'kids'), new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'headshots', true), new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'portraits'), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'headshots', true)];

exports.allPhotos = allPhotos;

},{}]},{},[2,3,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9nYWxsZXJ5U2VydmljZS5qcyIsInNvdXJjZS9zY3JpcHRzL21haW4uanMiLCJzb3VyY2Uvc2NyaXB0cy9waG90b1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRUEsSUFBSSxZQUFZLFlBQUEsQ0FBQzs7SUFFWCxPQUFPO1dBQVAsT0FBTzswQkFBUCxPQUFPOzs7ZUFBUCxPQUFPOztnQ0FDQztBQUNWLDJCQU5LLFNBQVMsQ0FNRztLQUNsQjs7O3FDQUVnQjtBQUNmLGFBQU8sY0FWRixTQUFTLENBVUcsTUFBTSxDQUFDLFVBQUEsS0FBSztlQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJO09BQUEsQ0FBQyxDQUFDO0tBQzlEOzs7cUNBRWdCLFFBQVEsRUFBRTtBQUN6QixhQUFPLGNBZEYsU0FBUyxDQWNHLE1BQU0sQ0FBQyxVQUFBLEtBQUs7ZUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUTtPQUFBLENBQUMsQ0FBQztLQUNsRTs7O1NBWEcsT0FBTzs7O0FBY2IsUUFFUyxZQUFZLEdBRnJCLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUVwQixZQUFZLEdBQVosWUFBWTs7O0FDcEJyQixZQUFZLENBQUM7Ozs7QUFJYixJQUFNLFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXJELElBQUksTUFBTSxHQUFHLGdCQUpKLFlBQVksQ0FJSyxjQUFjLEVBQUU7SUFDdEMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUNuQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBQ3BDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hCLGNBQWMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7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ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgYWxsUGhvdG9zIH0gZnJvbSAnLi9waG90b1NlcnZpY2UuanMnXG5cbmxldCBwaG90b0dhbGxlcnk7XG5cbmNsYXNzIEdhbGxlcnkge1xuICBhbGxQaG90b3MoKSB7IFxuICAgIHJldHVybiBhbGxQaG90b3M7XG4gIH1cblxuICBob21lcGFnZVBob3RvcygpIHtcbiAgICByZXR1cm4gYWxsUGhvdG9zLmZpbHRlcihwaG90byA9PiBwaG90b1snaG9tZXBhZ2UnXSA9PT0gdHJ1ZSk7XG4gIH1cbiAgXG4gIHBob3Rvc0J5Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gYWxsUGhvdG9zLmZpbHRlcihwaG90byA9PiBwaG90b1snY2F0ZWdvcnknXSA9PT0gY2F0ZWdvcnkpO1xuICB9XG59XG5cbnBob3RvR2FsbGVyeSA9IG5ldyBHYWxsZXJ5KCk7XG5cbmV4cG9ydCB7IHBob3RvR2FsbGVyeSB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBwaG90b0dhbGxlcnkgfSBmcm9tICcuL2dhbGxlcnlTZXJ2aWNlLmpzJztcblxuY29uc3QgZ2FsbGVyaWVzID0gWydwb3J0cmFpdHMnLCAnaGVhZHNob3RzJywgJ2tpZHMnXTtcblxubGV0IHBob3RvcyA9IHBob3RvR2FsbGVyeS5ob21lcGFnZVBob3RvcygpLFxuICAgICRmdWxscGFnZUNvbnRhaW5lciA9ICQoJyNmdWxscGFnZScpLFxuICAgICRzZWN0aW9uID0gJCgnI2Z1bGxwYWdlID4gLnNlY3Rpb24nKSxcbiAgICAkZ2FsbGVyeSA9ICQoJy5nYWxsZXJ5JyksXG4gICAgJGdhbGxlcnlIZWFkZXIgPSAkKCcuZ2FsbGVyeS1oZWFkZXInKSxcbiAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcbiAgICAkbWVudSA9ICQoJy5tZW51JyksXG4gICAgJHN1Ym1lbnUgPSAkKCcuc3VibWVudScpLFxuICAgICRuYXZiYXIgPSAkKCcubmF2YmFyJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIGluaXQgZnVsbFBhZ2Ugb24gaW5kZXggb25seVxuICBpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgIGFwcGVuZFNsaWRlcyhwaG90b3MpO1xuICAgIGluaXRGdWxscGFnZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJFdmVudHMoKTtcbiAgaW5pdEp1c3RpZmllZEdhbGxlcnkoKTtcbiAgaW5pdERyb3BpdCgpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50cygpIHtcbiAgLy8gcmVwb3B1bGF0ZSBnYWxsZXJ5IGVhY2ggdGltZSBhIGxpbmsgaXMgY2xpY2tlZCBpbiBQb3J0Zm9saW8gc3ViaGVhZGVyXG4gIGdhbGxlcmllcy5mb3JFYWNoKGdhbGxlcnkgPT4ge1xuICAgICRzdWJtZW51Lm9uKCdjbGljaycsIGAuJHtnYWxsZXJ5fS1saW5rYCwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgXG4gICAgICBpbml0SnVzdGlmaWVkR2FsbGVyeShnYWxsZXJ5KTsgXG4gICAgfSk7XG4gIH0pO1xuXG5cblxufVxuXG5mdW5jdGlvbiBpbWFnZVRhZyhwaG90bywgdHlwZSA9ICdmdWxsc2l6ZScpIHtcbiAgdmFyIHBhdGhUb1Bob3RvID0gdHlwZSA9PT0gJ3RodW1ibmFpbCcgPyAndGh1bWInIDogJ3BhdGgnO1xuXG4gIHJldHVybiBgPGltZyBzcmM9JyR7cGhvdG9bcGF0aFRvUGhvdG9dfScgZGF0YS1ob21lcGFnZT0nJHtwaG90by5ob21lcGFnZX0nYCArICBcbiAgICBgIGRhdGEtY2F0ZWdvcnk9JyR7cGhvdG8uY2F0ZWdvcnl9JyBjbGFzcz0nc2xpZGUnLz5gOyAgICAgICAgXG59XG5cbmZ1bmN0aW9uIGltYWdlQW5jaG9yKHBob3RvKSB7XG4gIHJldHVybiBgPGEgaHJlZj0nJHtwaG90by5wYXRofScgY2xhc3M9J3RodW1ibmFpbCc+JHtpbWFnZVRhZyhwaG90bywgJ3RodW1ibmFpbCcpfTwvYT5gXG59XG5cbmZ1bmN0aW9uIGFwcGVuZFNsaWRlcyhwaG90b3MpIHtcbiAgdmFyIHRhZztcblxuICBwaG90b3MuZm9yRWFjaChwaG90byA9PiB7XG4gICAgdGFnID0gaW1hZ2VUYWcocGhvdG8pO1xuXG4gICAgJHNlY3Rpb24uYXBwZW5kKHRhZyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYWxsZXJ5KHR5cGUpIHtcbiAgdmFyICRleGlzdGluZ1RodW1icyA9ICQoJy50aHVtYm5haWwnKSxcbiAgICAgIHRhZyxcbiAgICAgIHBob3RvcztcblxuICBwaG90b3MgPSBwaG90b0dhbGxlcnkucGhvdG9zQnlDYXRlZ29yeSh0eXBlKTtcblxuICBzZXRHYWxsZXJ5SGVhZGVyKHR5cGUudG9VcHBlckNhc2UoKSk7XG4gICRleGlzdGluZ1RodW1icy5yZW1vdmUoKTsgICAgXG5cbiAgcGhvdG9zLmZvckVhY2gocGhvdG8gPT4ge1xuICAgIHRhZyA9IGltYWdlQW5jaG9yKHBob3RvKTtcblxuICAgICRnYWxsZXJ5LmFwcGVuZCh0YWcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0R2FsbGVyeUhlYWRlcih0ZXh0KSB7XG4gICRnYWxsZXJ5SGVhZGVyLnRleHQodGV4dClcbn1cblxuZnVuY3Rpb24gZ2xvYmFsUHJldmVudERlZmF1bHQoKSB7XG4gICRkb2N1bWVudC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRGdWxscGFnZSgpIHtcbiAgJGZ1bGxwYWdlQ29udGFpbmVyLmZ1bGxwYWdlKHtcbiAgICByZXNpemU6IGZhbHNlLFxuICAgIHNjcm9sbGluZ1NwZWVkOiAyMDAwLFxuICAgIGVhc2luZzogJ2Vhc2VPdXRTaW5lJyxcbiAgICBjb250cm9sQXJyb3dzOiBmYWxzZSxcbiAgICBhZnRlckxvYWQ6IHNldEludGVydmFsKGZ1bmN0aW9uKCl7ICQuZm4uZnVsbHBhZ2UubW92ZVNsaWRlUmlnaHQoKSB9LCAyMDAwKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdEp1c3RpZmllZEdhbGxlcnkodHlwZSA9ICdoZWFkc2hvdHMnKSB7XG4gIGNyZWF0ZUdhbGxlcnkodHlwZSk7XG5cbiAgJGdhbGxlcnkuanVzdGlmaWVkR2FsbGVyeSgpO1xufVxuXG5mdW5jdGlvbiBpbml0RHJvcGl0KCkge1xuICAkbWVudS5kcm9waXQoe1xuICAgIGFjdGlvbjogJ21vdXNlZW50ZXInLFxuICAgIGJlZm9yZVNob3c6IGJlZm9yZURyb3BpdFNob3csXG4gICAgYWZ0ZXJIaWRlOiBhZnRlckRyb3BpdEhpZGVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZURyb3BpdFNob3coKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICcxNSUnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlckRyb3BpdEhpZGUoKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICczJSdcbiAgfSk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGluaXQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpbWFnZVJlZ2V4ID0gLyguanBnfC5wbmd8LmdpZnwudGlmZikvO1xuXG52YXIgYWxsUGhvdG9zO1xuXG5jbGFzcyBQaG90byB7XG4gIGNvbnN0cnVjdG9yIChwYXRoLCBjYXRlZ29yeSwgaG9tZXBhZ2UgPSBmYWxzZSwgdGh1bWIpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICB0aGlzLmhvbWVwYWdlID0gaG9tZXBhZ2U7XG4gICAgdGhpcy50aHVtYiA9IHRodW1iIHx8IHRvVGh1bWJuYWlsKHBhdGgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0b1RodW1ibmFpbChwYXRoKSB7XG4gIHZhciBmb3JtYXQgPSBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpLFxuICAgICAgdGh1bWJQbHVzRm9ybWF0ID0gYC10aHVtYiR7Zm9ybWF0fWA7XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZShpbWFnZVJlZ2V4LCB0aHVtYlBsdXNGb3JtYXQpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpIHtcbiAgdmFyIGluZGV4ID0gcGF0aC5zZWFyY2goaW1hZ2VSZWdleCk7XG4gIFxuICByZXR1cm4gcGF0aC5zbGljZShpbmRleClcbn1cblxuYWxsUGhvdG9zID0gW1xuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ3BvcnRyYWl0cycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTYuanBnJywgJ2hlYWRzaG90cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTcuanBnJywgJ2tpZHMnLCB0cnVlKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS04LmpwZycsICdwb3J0cmFpdHMnKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS05LmpwZycsICdraWRzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtMTIuanBnJywgJ2hlYWRzaG90cycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ3BvcnRyYWl0cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTYuanBnJywgJ2hlYWRzaG90cycsIHRydWUpXG5dO1xuXG5leHBvcnQgeyBhbGxQaG90b3MgfTsgXG4iXX0=
