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

var galleries = ['portraits', 'headshots', 'kids']; // move to config module?

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

  return '<img src=\'' + photo[pathToPhoto] + '\' data-homepage=\'' + photo.homepage + '\'' + (' data-category=\'' + photo.category + '\' class=\'slide ' + type + '\'/>');
}

function imageAnchor(photo) {
  return '<a href=\'' + photo.path + '\' class=\'image-anchor\'>' + imageTag(photo, 'thumbnail') + '</a>';
}

function appendSlides(photos) {
  var tag;

  photos.forEach(function (photo) {
    tag = imageTag(photo);

    $section.append(tag);
  });
}

function createGallery(type) {
  var $existingAnchors = $('.image-anchor'),
      tag,
      photos;

  photos = _galleryService.photoGallery.photosByCategory(type);

  setGalleryHeader(type.toUpperCase());
  $existingAnchors.remove();

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

  $gallery.justifiedGallery({ margins: 25, rowHeight: 180 }).on('jg.complete', function () {
    $(this).find('a').colorbox({
      maxWidth: '80%',
      maxHeight: '80%',
      opacity: 0.8,
      transition: 'elastic',
      scrolling: false,
      current: ''
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9nYWxsZXJ5U2VydmljZS5qcyIsInNvdXJjZS9zY3JpcHRzL21haW4uanMiLCJzb3VyY2Uvc2NyaXB0cy9waG90b1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRUEsSUFBSSxZQUFZLFlBQUEsQ0FBQzs7SUFFWCxPQUFPO1dBQVAsT0FBTzswQkFBUCxPQUFPOzs7ZUFBUCxPQUFPOztnQ0FDQztBQUNWLDJCQU5LLFNBQVMsQ0FNRztLQUNsQjs7O3FDQUVnQjtBQUNmLGFBQU8sY0FWRixTQUFTLENBVUcsTUFBTSxDQUFDLFVBQUEsS0FBSztlQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJO09BQUEsQ0FBQyxDQUFDO0tBQzlEOzs7cUNBRWdCLFFBQVEsRUFBRTtBQUN6QixhQUFPLGNBZEYsU0FBUyxDQWNHLE1BQU0sQ0FBQyxVQUFBLEtBQUs7ZUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUTtPQUFBLENBQUMsQ0FBQztLQUNsRTs7O1NBWEcsT0FBTzs7O0FBY2IsUUFFUyxZQUFZLEdBRnJCLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUVwQixZQUFZLEdBQVosWUFBWTs7O0FDcEJyQixZQUFZLENBQUM7Ozs7QUFJYixJQUFNLFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDOztBQUFDLEFBRXJELElBQUksTUFBTSxHQUFHLGdCQUpKLFlBQVksQ0FJSyxjQUFjLEVBQUU7SUFDdEMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUNuQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBQ3BDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hCLGNBQWMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7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QUksS0FBSyxDQUFDLHdDQUF3QyxFQUFFLFdBQVcsQ0FBQyxFQUNoRSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxNQUFNLENBQUMsRUFDM0QsSUFBSSxLQUFLLENBQUMseUNBQXlDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUN2RSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxXQUFXLENBQUMsRUFDaEUsSUFBSSxLQUFLLENBQUMsd0NBQXdDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUN2RSxDQUFDOztRQUVPLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGFsbFBob3RvcyB9IGZyb20gJy4vcGhvdG9TZXJ2aWNlLmpzJ1xuXG5sZXQgcGhvdG9HYWxsZXJ5O1xuXG5jbGFzcyBHYWxsZXJ5IHtcbiAgYWxsUGhvdG9zKCkgeyBcbiAgICByZXR1cm4gYWxsUGhvdG9zO1xuICB9XG5cbiAgaG9tZXBhZ2VQaG90b3MoKSB7XG4gICAgcmV0dXJuIGFsbFBob3Rvcy5maWx0ZXIocGhvdG8gPT4gcGhvdG9bJ2hvbWVwYWdlJ10gPT09IHRydWUpO1xuICB9XG4gIFxuICBwaG90b3NCeUNhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGFsbFBob3Rvcy5maWx0ZXIocGhvdG8gPT4gcGhvdG9bJ2NhdGVnb3J5J10gPT09IGNhdGVnb3J5KTtcbiAgfVxufVxuXG5waG90b0dhbGxlcnkgPSBuZXcgR2FsbGVyeSgpO1xuXG5leHBvcnQgeyBwaG90b0dhbGxlcnkgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgcGhvdG9HYWxsZXJ5IH0gZnJvbSAnLi9nYWxsZXJ5U2VydmljZS5qcyc7XG5cbmNvbnN0IGdhbGxlcmllcyA9IFsncG9ydHJhaXRzJywgJ2hlYWRzaG90cycsICdraWRzJ107IC8vIG1vdmUgdG8gY29uZmlnIG1vZHVsZT9cblxubGV0IHBob3RvcyA9IHBob3RvR2FsbGVyeS5ob21lcGFnZVBob3RvcygpLFxuICAgICRmdWxscGFnZUNvbnRhaW5lciA9ICQoJyNmdWxscGFnZScpLFxuICAgICRzZWN0aW9uID0gJCgnI2Z1bGxwYWdlID4gLnNlY3Rpb24nKSxcbiAgICAkZ2FsbGVyeSA9ICQoJy5nYWxsZXJ5JyksXG4gICAgJGdhbGxlcnlIZWFkZXIgPSAkKCcuZ2FsbGVyeS1oZWFkZXInKSxcbiAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcbiAgICAkbWVudSA9ICQoJy5tZW51JyksXG4gICAgJHN1Ym1lbnUgPSAkKCcuc3VibWVudScpLFxuICAgICRuYXZiYXIgPSAkKCcubmF2YmFyJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIGluaXQgZnVsbFBhZ2Ugb24gaW5kZXggb25seVxuICBpZiAoJHNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgIGFwcGVuZFNsaWRlcyhwaG90b3MpO1xuICAgIGluaXRGdWxscGFnZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJFdmVudHMoKTtcbiAgaW5pdEp1c3RpZmllZEdhbGxlcnkoKTtcbiAgaW5pdERyb3BpdCgpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50cygpIHtcbiAgLy8gcmVwb3B1bGF0ZSBnYWxsZXJ5IGVhY2ggdGltZSBhIGxpbmsgaXMgY2xpY2tlZCBpbiBQb3J0Zm9saW8gc3ViaGVhZGVyXG4gIGdhbGxlcmllcy5mb3JFYWNoKGdhbGxlcnkgPT4ge1xuICAgICRzdWJtZW51Lm9uKCdjbGljaycsIGAuJHtnYWxsZXJ5fS1saW5rYCwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgXG4gICAgICBpbml0SnVzdGlmaWVkR2FsbGVyeShnYWxsZXJ5KTsgXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbWFnZVRhZyhwaG90bywgdHlwZSA9ICdmdWxsc2l6ZScpIHtcbiAgdmFyIHBhdGhUb1Bob3RvID0gdHlwZSA9PT0gJ3RodW1ibmFpbCcgPyAndGh1bWInIDogJ3BhdGgnO1xuXG4gIHJldHVybiBgPGltZyBzcmM9JyR7cGhvdG9bcGF0aFRvUGhvdG9dfScgZGF0YS1ob21lcGFnZT0nJHtwaG90by5ob21lcGFnZX0nYCArICBcbiAgICBgIGRhdGEtY2F0ZWdvcnk9JyR7cGhvdG8uY2F0ZWdvcnl9JyBjbGFzcz0nc2xpZGUgJHt0eXBlfScvPmA7ICAgICAgICBcbn1cblxuZnVuY3Rpb24gaW1hZ2VBbmNob3IocGhvdG8pIHtcbiAgcmV0dXJuIGA8YSBocmVmPScke3Bob3RvLnBhdGh9JyBjbGFzcz0naW1hZ2UtYW5jaG9yJz4ke2ltYWdlVGFnKHBob3RvLCAndGh1bWJuYWlsJyl9PC9hPmBcbn1cblxuZnVuY3Rpb24gYXBwZW5kU2xpZGVzKHBob3Rvcykge1xuICB2YXIgdGFnO1xuXG4gIHBob3Rvcy5mb3JFYWNoKHBob3RvID0+IHtcbiAgICB0YWcgPSBpbWFnZVRhZyhwaG90byk7XG5cbiAgICAkc2VjdGlvbi5hcHBlbmQodGFnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbGxlcnkodHlwZSkge1xuICB2YXIgJGV4aXN0aW5nQW5jaG9ycyA9ICQoJy5pbWFnZS1hbmNob3InKSxcbiAgICAgIHRhZyxcbiAgICAgIHBob3RvcztcblxuICBwaG90b3MgPSBwaG90b0dhbGxlcnkucGhvdG9zQnlDYXRlZ29yeSh0eXBlKTtcblxuICBzZXRHYWxsZXJ5SGVhZGVyKHR5cGUudG9VcHBlckNhc2UoKSk7XG4gICRleGlzdGluZ0FuY2hvcnMucmVtb3ZlKCk7ICAgIFxuXG4gIHBob3Rvcy5mb3JFYWNoKHBob3RvID0+IHtcbiAgICB0YWcgPSBpbWFnZUFuY2hvcihwaG90byk7XG5cbiAgICAkZ2FsbGVyeS5hcHBlbmQodGFnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEdhbGxlcnlIZWFkZXIodGV4dCkge1xuICAkZ2FsbGVyeUhlYWRlci50ZXh0KHRleHQpXG59XG5cbmZ1bmN0aW9uIGdsb2JhbFByZXZlbnREZWZhdWx0KCkge1xuICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0RnVsbHBhZ2UoKSB7XG4gICRmdWxscGFnZUNvbnRhaW5lci5mdWxscGFnZSh7XG4gICAgcmVzaXplOiBmYWxzZSxcbiAgICBzY3JvbGxpbmdTcGVlZDogMjAwMCxcbiAgICBlYXNpbmc6ICdlYXNlT3V0U2luZScsXG4gICAgY29udHJvbEFycm93czogZmFsc2UsXG4gICAgYWZ0ZXJMb2FkOiBzZXRJbnRlcnZhbChmdW5jdGlvbigpeyAkLmZuLmZ1bGxwYWdlLm1vdmVTbGlkZVJpZ2h0KCkgfSwgMjAwMClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRKdXN0aWZpZWRHYWxsZXJ5KHR5cGUgPSAnaGVhZHNob3RzJykge1xuICBjcmVhdGVHYWxsZXJ5KHR5cGUpO1xuXG4gICRnYWxsZXJ5Lmp1c3RpZmllZEdhbGxlcnkoeyBtYXJnaW5zOiAyNSwgcm93SGVpZ2h0OiAxODAgfSkuXG4gICAgb24oJ2pnLmNvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmZpbmQoJ2EnKS5jb2xvcmJveCh7XG4gICAgICAgIG1heFdpZHRoIDogJzgwJScsXG4gICAgICAgIG1heEhlaWdodCA6ICc4MCUnLFxuICAgICAgICBvcGFjaXR5IDogMC44LFxuICAgICAgICB0cmFuc2l0aW9uIDogJ2VsYXN0aWMnLFxuICAgICAgICBzY3JvbGxpbmcgOiBmYWxzZSxcbiAgICAgICAgY3VycmVudCA6ICcnXG4gICAgICB9KTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0RHJvcGl0KCkge1xuICAkbWVudS5kcm9waXQoe1xuICAgIGFjdGlvbjogJ21vdXNlZW50ZXInLFxuICAgIGJlZm9yZVNob3c6IGJlZm9yZURyb3BpdFNob3csXG4gICAgYWZ0ZXJIaWRlOiBhZnRlckRyb3BpdEhpZGVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZURyb3BpdFNob3coKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICcxNSUnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlckRyb3BpdEhpZGUoKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICczJSdcbiAgfSk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGluaXQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpbWFnZVJlZ2V4ID0gLyguanBnfC5wbmd8LmdpZnwudGlmZikvO1xuXG52YXIgYWxsUGhvdG9zO1xuXG5jbGFzcyBQaG90byB7XG4gIGNvbnN0cnVjdG9yIChwYXRoLCBjYXRlZ29yeSwgaG9tZXBhZ2UgPSBmYWxzZSwgdGh1bWIpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICB0aGlzLmhvbWVwYWdlID0gaG9tZXBhZ2U7XG4gICAgdGhpcy50aHVtYiA9IHRodW1iIHx8IHRvVGh1bWJuYWlsKHBhdGgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0b1RodW1ibmFpbChwYXRoKSB7XG4gIHZhciBmb3JtYXQgPSBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpLFxuICAgICAgdGh1bWJQbHVzRm9ybWF0ID0gYC10aHVtYiR7Zm9ybWF0fWA7XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZShpbWFnZVJlZ2V4LCB0aHVtYlBsdXNGb3JtYXQpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpIHtcbiAgdmFyIGluZGV4ID0gcGF0aC5zZWFyY2goaW1hZ2VSZWdleCk7XG4gIFxuICByZXR1cm4gcGF0aC5zbGljZShpbmRleClcbn1cblxuYWxsUGhvdG9zID0gW1xuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ3BvcnRyYWl0cycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTYuanBnJywgJ2hlYWRzaG90cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTcuanBnJywgJ2tpZHMnLCB0cnVlKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS04LmpwZycsICdwb3J0cmFpdHMnKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS05LmpwZycsICdraWRzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtMTIuanBnJywgJ2hlYWRzaG90cycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ3BvcnRyYWl0cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTYuanBnJywgJ2hlYWRzaG90cycsIHRydWUpXG5dO1xuXG5leHBvcnQgeyBhbGxQaG90b3MgfTsgXG4iXX0=
