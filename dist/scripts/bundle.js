(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _photos = require('./photos.js');

var _photos2 = _interopRequireDefault(_photos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotoShoot = PhotoShoot || {};

PhotoShoot.Config = {};

PhotoShoot.Photos = (0, _photos2.default)();

PhotoShoot.Events = (function () {
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
    return '<img src=\'' + photo.path + '\' alt=\'' + photo.title + '\'' + (' data-category=\'' + photo.category + '\' class=\'slide\' >');
  }

  function appendSlides(photos) {
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
      height: '15%'
    });
  }

  function afterDropitHide() {
    $navbar.css({
      height: '3%'
    });
  }

  return { init: init };
})();

$(document).ready(PhotoShoot.Events.init);

},{"./photos.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var photoService = function photoService() {
  var photos;

  var Photo = function Photo(path, category, title) {
    _classCallCheck(this, Photo);

    this.path = path;
    this.category = category;
    this.title = title || 'title';
  };

  ;

  photos = [new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'), new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots'), new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'), new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'), new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'), new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots')];

  return photos;
};

exports.default = photoService;

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9tYWluLmpzIiwic291cmNlL3NjcmlwdHMvcGhvdG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7OztBQUliLElBQUksVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRWxDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUV2QixVQUFVLENBQUMsTUFBTSxHQUFHLHVCQUFjLENBQUM7O0FBRW5DLFVBQVUsQ0FBQyxNQUFNLEdBQUksQ0FBQSxZQUFXO0FBQzlCLE1BQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztNQUNwQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztNQUN2QixLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztNQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUzQixXQUFTLElBQUksR0FBRzs7QUFFZCxnQkFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxRQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLGtCQUFZLEVBQUUsQ0FBQztLQUNoQjtBQUNELGNBQVUsRUFBRSxDQUFDO0dBQ2Q7O0FBRUQsV0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3ZCLFdBQU8sZ0JBQWEsS0FBSyxDQUFDLElBQUksaUJBQVUsS0FBSyxDQUFDLEtBQUssaUNBQzlCLEtBQUssQ0FBQyxRQUFRLDBCQUFtQixDQUFDO0dBQ3hEOztBQUVELFdBQVMsWUFBWSxDQUFDLE1BQU0sRUFBRTtBQUM1QixRQUFJLEdBQUcsQ0FBQzs7QUFFUixVQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQzdCLFNBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXRCLGNB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YXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBob3RvU2VydmljZSBmcm9tICcuL3Bob3Rvcy5qcyc7XG5cbnZhciBQaG90b1Nob290ID0gUGhvdG9TaG9vdCB8fCB7fTtcblxuUGhvdG9TaG9vdC5Db25maWcgPSB7fTtcblxuUGhvdG9TaG9vdC5QaG90b3MgPSBwaG90b1NlcnZpY2UoKTtcblxuUGhvdG9TaG9vdC5FdmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciAkc2VjdGlvbiA9ICQoJyNmdWxscGFnZSA+IC5zZWN0aW9uJyksXG4gICAgICAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcbiAgICAgICRtZW51ID0gJCgnLm1lbnUnKSxcbiAgICAgICRuYXZiYXIgPSAkKCcubmF2YmFyJyk7XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAvLyBnbG9iYWxQcmV2ZW50RGVmYXVsdCgpO1xuICAgIGFwcGVuZFNsaWRlcyhQaG90b1Nob290LlBob3Rvcyk7XG4gICAgaWYgKCRzZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgIGluaXRGdWxscGFnZSgpO1xuICAgIH1cbiAgICBpbml0RHJvcGl0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbWFnZVRhZyhwaG90bykge1xuICAgIHJldHVybiBgPGltZyBzcmM9JyR7cGhvdG8ucGF0aH0nIGFsdD0nJHtwaG90by50aXRsZX0nYCArICBcbiAgICAgIGAgZGF0YS1jYXRlZ29yeT0nJHtwaG90by5jYXRlZ29yeX0nIGNsYXNzPSdzbGlkZScgPmA7ICAgICAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZFNsaWRlcyhwaG90b3MpIHtcbiAgICB2YXIgdGFnO1xuXG4gICAgcGhvdG9zLmZvckVhY2goZnVuY3Rpb24ocGhvdG8pIHtcbiAgICAgIHRhZyA9IGltYWdlVGFnKHBob3RvKTtcblxuICAgICAgJHNlY3Rpb24uYXBwZW5kKHRhZyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbG9iYWxQcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRGdWxscGFnZSgpIHtcbiAgICAkKCcjZnVsbHBhZ2UnKS5mdWxscGFnZSh7XG4gICAgICByZXNpemU6IGZhbHNlLFxuICAgICAgc2Nyb2xsaW5nU3BlZWQ6IDIwMDAsXG4gICAgICBlYXNpbmc6ICdlYXNlT3V0U2luZScsXG4gICAgICBjb250cm9sQXJyb3dzOiBmYWxzZSxcbiAgICAgIGFmdGVyTG9hZDogc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXsgJC5mbi5mdWxscGFnZS5tb3ZlU2xpZGVSaWdodCgpIH0sIDIwMDApXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RHJvcGl0KCkge1xuICAgICRtZW51LmRyb3BpdCh7XG4gICAgICBhY3Rpb246ICdtb3VzZWVudGVyJyxcbiAgICAgIGJlZm9yZVNob3c6IGJlZm9yZURyb3BpdFNob3csXG4gICAgICBhZnRlckhpZGU6IGFmdGVyRHJvcGl0SGlkZVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYmVmb3JlRHJvcGl0U2hvdygpIHtcbiAgICAkbmF2YmFyLmNzcyh7XG4gICAgICBoZWlnaHQ6ICcxNSUnXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZnRlckRyb3BpdEhpZGUoKSB7XG4gICAgJG5hdmJhci5jc3Moe1xuICAgICAgaGVpZ2h0OiAnMyUnXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBpbml0OiBpbml0IH07IFxufSgpKTtcblxuJChkb2N1bWVudCkucmVhZHkoUGhvdG9TaG9vdC5FdmVudHMuaW5pdCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBwaG90b1NlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwaG90b3M7XG5cbiAgY2xhc3MgUGhvdG8ge1xuICAgIGNvbnN0cnVjdG9yIChwYXRoLCBjYXRlZ29yeSwgdGl0bGUpIHtcbiAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGUgfHwgJ3RpdGxlJztcbiAgICB9XG4gIH07XG4gXG4gIHBob3RvcyA9IFtcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ1BvcnRyYWl0cycpLFxuICAgIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnSGVhZHNob3RzJyksXG4gICAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS03LmpwZycsICdLaWRzJyksXG4gICAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS04LmpwZycsICdQb3J0cmFpdHMnKSxcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTkuanBnJywgJ0tpZHMnKSxcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTEyLmpwZycsICdIZWFkc2hvdHMnKSxcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTUuanBnJywgJ1BvcnRyYWl0cycpLFxuICAgIG5ldyBQaG90bygnLi9kaXN0L2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnSGVhZHNob3RzJyksXG4gICAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS03LmpwZycsICdLaWRzJyksXG4gICAgbmV3IFBob3RvKCcuL2Rpc3QvaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS04LmpwZycsICdQb3J0cmFpdHMnKSxcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTkuanBnJywgJ0tpZHMnKSxcbiAgICBuZXcgUGhvdG8oJy4vZGlzdC9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTEyLmpwZycsICdIZWFkc2hvdHMnKVxuICBdO1xuXG4gIHJldHVybiBwaG90b3M7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaG90b1NlcnZpY2U7Il19
