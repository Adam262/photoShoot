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
      var type = arguments.length <= 0 || arguments[0] === undefined ? 'fullsize' : arguments[0];

      return type === 'thumbnail' ? _photoService.allThumbnails : _photoService.allPhotos;
    }
  }, {
    key: 'homepagePhotos',
    value: function homepagePhotos() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? 'fullsize' : arguments[0];

      var photoStore = type === 'thumbnail' ? _photoService.allThumbnails : _photoService.allPhotos;

      return this.photoStore.filter(function (photo) {
        return photo['homepage'] === true;
      });
    }
  }, {
    key: 'photosByCategory',
    value: function photosByCategory(category) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? 'fullsize' : arguments[1];

      var photoStore = type === 'thumbnail' ? _photoService.allThumbnails : _photoService.allPhotos;

      return this.photoStore.filter(function (photo) {
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

var photos = _galleryService.photoGallery.allPhotos(),
    thumbnails = _galleryService.photoGallery.allPhotos('thumbnail'),
    $section = $('#fullpage > .section'),
    $document = $(document),
    $menu = $('.menu'),
    $navbar = $('.navbar');

console.log(thumbnails);
function init() {
  appendSlides(photos);
  if ($section.length > 0) {
    initFullpage();
  }
  initDropit();
}

function imageTag(photo) {
  return '<img src=\'' + photo.path + '\' data-homepage=\'' + photo.homepage + '\'' + (' data-category=\'' + photo.category + '\' class=\'slide\' >');
}

function appendSlides(thumbnails) {
  var tag;

  photos.forEach(function (photo) {
    tag = imageTag(photo);

    $section.append(tag);
  });
}

function globalPreventDefault() {
  $document.on('click', 'a', function (event) {
    event.preventDefault();
  });
}

function initFullpage() {
  $('#fullpage').fullpage({
    resize: false,
    scrollingSpeed: 2000,
    easing: 'easeOutSine',
    controlArrows: false,
    afterLoad: setInterval(function () {
      $.fn.fullpage.moveSlideRight();
    }, 2000)
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

},{"./galleryService.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allPhotos, allThumbnails;

var Photo = function Photo(path, category) {
  var homepage = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  _classCallCheck(this, Photo);

  this.path = path;
  this.category = category;
  this.homepage = homepage;
};

;

exports.allPhotos = allPhotos = [new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits', true), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'), new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids', true), new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots', true), new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots', true)];

exports.allThumbnails = allThumbnails = [new Photo('./dist/images/nyh-site-coverpage-5-thumb.jpg', 'Portraits', true), new Photo('./dist/images/nyh-site-coverpage-6-thumb.jpg', 'Headshots'), new Photo('./dist/images/nyh-site-coverpage-7-thumb.jpg', 'Kids', true), new Photo('./dist/images/nyh-site-coverpage-8-thumb.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-9-thumb.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-12-thumb.jpg', 'Headshots', true), new Photo('./dist/images/nyh-site-coverpage-5-thumb.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-6-thumb.jpg', 'Headshots', true)];

exports.allPhotos = allPhotos;
exports.allThumbnails = allThumbnails;

},{}]},{},[2,3,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9nYWxsZXJ5U2VydmljZS5qcyIsInNvdXJjZS9zY3JpcHRzL21haW4uanMiLCJzb3VyY2Uvc2NyaXB0cy9waG90b1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRUEsSUFBSSxZQUFZLFlBQUEsQ0FBQzs7SUFFWCxPQUFPO0FBQ1gsV0FESSxPQUFPLEdBQ0c7MEJBRFYsT0FBTztHQUNLOztlQURaLE9BQU87O2dDQUdrQjtVQUFuQixJQUFJLHlEQUFHLFVBQVU7O0FBQ3pCLGFBQU8sSUFBSSxLQUFLLFdBQVcsaUJBUlgsYUFBYSxpQkFBeEIsU0FBUyxBQVF5QyxDQUFDO0tBQ3pEOzs7cUNBRWlDO1VBQW5CLElBQUkseURBQUcsVUFBVTs7QUFDOUIsVUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLFdBQVcsaUJBWnJCLGFBQWEsaUJBQXhCLFNBQVMsQUFZbUQsQ0FBQzs7QUFFbEUsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUs7ZUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSTtPQUFBLENBQUMsQ0FBQztLQUNwRTs7O3FDQUVnQixRQUFRLEVBQXFCO1VBQW5CLElBQUkseURBQUcsVUFBVTs7QUFDMUMsVUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLFdBQVcsaUJBbEJyQixhQUFhLGlCQUF4QixTQUFTLEFBa0JtRCxDQUFDOztBQUVsRSxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSztlQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxRQUFRO09BQUEsQ0FBQyxDQUFDO0tBQ3hFOzs7U0FqQkcsT0FBTzs7O0FBb0JiLFFBRVMsWUFBWSxHQUZyQixZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7UUFFcEIsWUFBWSxHQUFaLFlB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LGFBQWEsR0FBYixhQUFhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGFsbFBob3RvcywgYWxsVGh1bWJuYWlscyB9IGZyb20gJy4vcGhvdG9TZXJ2aWNlLmpzJ1xuXG5sZXQgcGhvdG9HYWxsZXJ5O1xuXG5jbGFzcyBHYWxsZXJ5IHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFsbFBob3Rvcyh0eXBlID0gJ2Z1bGxzaXplJykgeyBcbiAgICByZXR1cm4gdHlwZSA9PT0gJ3RodW1ibmFpbCcgPyBhbGxUaHVtYm5haWxzIDogYWxsUGhvdG9zO1xuICB9XG5cbiAgaG9tZXBhZ2VQaG90b3ModHlwZSA9ICdmdWxsc2l6ZScpIHtcbiAgICB2YXIgcGhvdG9TdG9yZSA9IHR5cGUgPT09ICd0aHVtYm5haWwnID8gYWxsVGh1bWJuYWlscyA6IGFsbFBob3RvcztcblxuICAgIHJldHVybiB0aGlzLnBob3RvU3RvcmUuZmlsdGVyKHBob3RvID0+IHBob3RvWydob21lcGFnZSddID09PSB0cnVlKTtcbiAgfVxuICBcbiAgcGhvdG9zQnlDYXRlZ29yeShjYXRlZ29yeSwgdHlwZSA9ICdmdWxsc2l6ZScpIHtcbiAgICB2YXIgcGhvdG9TdG9yZSA9IHR5cGUgPT09ICd0aHVtYm5haWwnID8gYWxsVGh1bWJuYWlscyA6IGFsbFBob3RvcztcblxuICAgIHJldHVybiB0aGlzLnBob3RvU3RvcmUuZmlsdGVyKHBob3RvID0+IHBob3RvWydjYXRlZ29yeSddID09PSBjYXRlZ29yeSk7XG4gIH1cbn1cblxucGhvdG9HYWxsZXJ5ID0gbmV3IEdhbGxlcnkoKTtcblxuZXhwb3J0IHsgcGhvdG9HYWxsZXJ5IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IHBob3RvR2FsbGVyeSB9IGZyb20gJy4vZ2FsbGVyeVNlcnZpY2UuanMnO1xuXG5sZXQgcGhvdG9zID0gcGhvdG9HYWxsZXJ5LmFsbFBob3RvcygpLFxuICAgIHRodW1ibmFpbHMgPSBwaG90b0dhbGxlcnkuYWxsUGhvdG9zKCd0aHVtYm5haWwnKSxcbiAgICAkc2VjdGlvbiA9ICQoJyNmdWxscGFnZSA+IC5zZWN0aW9uJyksXG4gICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCksXG4gICAgJG1lbnUgPSAkKCcubWVudScpLFxuICAgICRuYXZiYXIgPSAkKCcubmF2YmFyJyk7XG5cbiAgICBjb25zb2xlLmxvZyh0aHVtYm5haWxzKVxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwZW5kU2xpZGVzKHBob3Rvcyk7XG4gIGlmICgkc2VjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgaW5pdEZ1bGxwYWdlKCk7XG4gIH1cbiAgaW5pdERyb3BpdCgpO1xufVxuXG5mdW5jdGlvbiBpbWFnZVRhZyhwaG90bykge1xuICByZXR1cm4gYDxpbWcgc3JjPScke3Bob3RvLnBhdGh9JyBkYXRhLWhvbWVwYWdlPScke3Bob3RvLmhvbWVwYWdlfSdgICsgIFxuICAgIGAgZGF0YS1jYXRlZ29yeT0nJHtwaG90by5jYXRlZ29yeX0nIGNsYXNzPSdzbGlkZScgPmA7ICAgICAgICBcbn1cblxuZnVuY3Rpb24gYXBwZW5kU2xpZGVzKHRodW1ibmFpbHMpIHtcbiAgdmFyIHRhZztcblxuICBwaG90b3MuZm9yRWFjaChmdW5jdGlvbihwaG90bykge1xuICAgIHRhZyA9IGltYWdlVGFnKHBob3RvKTtcblxuICAgICRzZWN0aW9uLmFwcGVuZCh0YWcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2xvYmFsUHJldmVudERlZmF1bHQoKSB7XG4gICRkb2N1bWVudC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRGdWxscGFnZSgpIHtcbiAgJCgnI2Z1bGxwYWdlJykuZnVsbHBhZ2Uoe1xuICAgIHJlc2l6ZTogZmFsc2UsXG4gICAgc2Nyb2xsaW5nU3BlZWQ6IDIwMDAsXG4gICAgZWFzaW5nOiAnZWFzZU91dFNpbmUnLFxuICAgIGNvbnRyb2xBcnJvd3M6IGZhbHNlLFxuICAgIGFmdGVyTG9hZDogc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXsgJC5mbi5mdWxscGFnZS5tb3ZlU2xpZGVSaWdodCgpIH0sIDIwMDApXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0RHJvcGl0KCkge1xuICAkbWVudS5kcm9waXQoe1xuICAgIGFjdGlvbjogJ21vdXNlZW50ZXInLFxuICAgIGJlZm9yZVNob3c6IGJlZm9yZURyb3BpdFNob3csXG4gICAgYWZ0ZXJIaWRlOiBhZnRlckRyb3BpdEhpZGVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZURyb3BpdFNob3coKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICcxMiUnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlckRyb3BpdEhpZGUoKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICczJSdcbiAgfSk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGluaXQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxsUGhvdG9zLFxuICAgIGFsbFRodW1ibmFpbHM7XG5cbmNsYXNzIFBob3RvIHtcbiAgY29uc3RydWN0b3IgKHBhdGgsIGNhdGVnb3J5LCBob21lcGFnZSA9IGZhbHNlKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgdGhpcy5ob21lcGFnZSA9IGhvbWVwYWdlO1xuICB9XG59O1xuXG5hbGxQaG90b3MgPSBbXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNS5qcGcnLCAnUG9ydHJhaXRzJywgdHJ1ZSksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnSGVhZHNob3RzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNy5qcGcnLCAnS2lkcycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTguanBnJywgJ1BvcnRyYWl0cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTkuanBnJywgJ0tpZHMnKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS0xMi5qcGcnLCAnSGVhZHNob3RzJywgdHJ1ZSksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNS5qcGcnLCAnUG9ydHJhaXRzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnSGVhZHNob3RzJywgdHJ1ZSlcbl07XG5cbmFsbFRodW1ibmFpbHMgPSBbXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNS10aHVtYi5qcGcnLCAnUG9ydHJhaXRzJywgdHJ1ZSksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi10aHVtYi5qcGcnLCAnSGVhZHNob3RzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNy10aHVtYi5qcGcnLCAnS2lkcycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTgtdGh1bWIuanBnJywgJ1BvcnRyYWl0cycpLFxuICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTktdGh1bWIuanBnJywgJ0tpZHMnKSxcbiAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS0xMi10aHVtYi5qcGcnLCAnSGVhZHNob3RzJywgdHJ1ZSksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNS10aHVtYi5qcGcnLCAnUG9ydHJhaXRzJyksXG4gIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi10aHVtYi5qcGcnLCAnSGVhZHNob3RzJywgdHJ1ZSlcbl07XG5cbmV4cG9ydCB7IGFsbFBob3RvcywgYWxsVGh1bWJuYWlscyB9OyBcbiJdfQ==
