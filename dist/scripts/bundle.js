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
var pages = ['fullpage', 'portfolio', 'about', 'contact'];

var photos = _galleryService.photoGallery.homepagePhotos(),
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
  pages.forEach(function (page) {
    $document.on('click', '.' + page + '-link', function (event) {
      event.preventDefault();

      togglePageVisibility(page);
    });
  });

  // repopulate gallery each time a link is clicked in Portfolio subheader
  galleries.forEach(function (gallery) {
    $submenu.on('click', '.' + gallery + '-link', function (event) {
      event.preventDefault();

      initJustifiedGallery(gallery);
    });
  });
}

function togglePageVisibility(page) {
  $pages.each(function () {
    $(this).hide();
    $('.' + page).show();

    toggleFooter(page);
  });
}

function toggleFooter(page) {
  var isFullpage = page === 'fullpage';

  $footer.toggle(!isFullpage);
  $logoContainer.toggle(isFullpage);
}

function imageTag(photo) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? 'fullsize' : arguments[1];

  var pathToPhoto = type === 'thumbnail' ? 'thumb' : 'path';

  return '<img src=\'' + photo[pathToPhoto] + '\' data-homepage=\'' + photo.homepage + '\'' + (' data-category=\'' + photo.category + '\' class=\'slide ' + type + '\'>');
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
  var triggerPortfolio = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

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

exports.allPhotos = allPhotos = [new Photo('./images/nyh-site-coverpage-5.jpg', 'portraits', true), new Photo('./images/nyh-site-coverpage-6.jpg', 'headshots'), new Photo('./images/nyh-site-coverpage-7.jpg', 'kids', true), new Photo('./images/nyh-site-coverpage-8.jpg', 'portraits'), new Photo('./images/nyh-site-coverpage-9.jpg', 'kids'), new Photo('./images/nyh-site-coverpage-12.jpg', 'headshots', true), new Photo('./images/nyh-site-coverpage-5.jpg', 'portraits'), new Photo('./images/nyh-site-coverpage-6.jpg', 'headshots', true)];

exports.allPhotos = allPhotos;

},{}]},{},[2,3,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2Uvc2NyaXB0cy9nYWxsZXJ5U2VydmljZS5qcyIsInNvdXJjZS9zY3JpcHRzL21haW4uanMiLCJzb3VyY2Uvc2NyaXB0cy9waG90b1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRUEsSUFBSSxZQUFZLFlBQUEsQ0FBQzs7SUFFWCxPQUFPO1dBQVAsT0FBTzswQkFBUCxPQUFPOzs7ZUFBUCxPQUFPOztnQ0FDQztBQUNWLDJCQU5LLFNBQVMsQ0FNRztLQUNsQjs7O3FDQUVnQjtBQUNmLGFBQU8sY0FWRixTQUFTLENBVUcsTUFBTSxDQUFDLFVBQUEsS0FBSztlQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJO09BQUEsQ0FBQyxDQUFDO0tBQzlEOzs7cUNBRWdCLFFBQVEsRUFBRTtBQUN6QixhQUFPLGNBZEYsU0FBUyxDQWNHLE1BQU0sQ0FBQyxVQUFBLEtBQUs7ZUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUTtPQUFBLENBQUMsQ0FBQztLQUNsRTs7O1NBWEcsT0FBTzs7O0FBY2IsUUFFUyxZQUFZLEdBRnJCLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUVwQixZQUFZLEdBQVosWUFBWTs7O0FDcEJyQixZQUFZLENBQUM7Ozs7QUFJYixJQUFNLFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckQsSUFBTSxLQUFLLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFNUQsSUFBSSxNQUFNLEdBQUcsZ0JBTEosWUFBWSxDQUtLLGNBQWMsRUFBRTtJQUN0QyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN2QixNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNuQixr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bUMsRUFBRSxNQUFNLENBQUMsRUFDdEQsSUFBSSxLQUFLLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUNsRSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsRUFDM0QsSUFBSSxLQUFLLENBQUMsbUNBQW1DLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUNsRSxDQUFDOztRQUVPLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGFsbFBob3RvcyB9IGZyb20gJy4vcGhvdG9TZXJ2aWNlLmpzJ1xuXG5sZXQgcGhvdG9HYWxsZXJ5O1xuXG5jbGFzcyBHYWxsZXJ5IHtcbiAgYWxsUGhvdG9zKCkgeyBcbiAgICByZXR1cm4gYWxsUGhvdG9zO1xuICB9XG5cbiAgaG9tZXBhZ2VQaG90b3MoKSB7XG4gICAgcmV0dXJuIGFsbFBob3Rvcy5maWx0ZXIocGhvdG8gPT4gcGhvdG9bJ2hvbWVwYWdlJ10gPT09IHRydWUpO1xuICB9XG4gIFxuICBwaG90b3NCeUNhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGFsbFBob3Rvcy5maWx0ZXIocGhvdG8gPT4gcGhvdG9bJ2NhdGVnb3J5J10gPT09IGNhdGVnb3J5KTtcbiAgfVxufVxuXG5waG90b0dhbGxlcnkgPSBuZXcgR2FsbGVyeSgpO1xuXG5leHBvcnQgeyBwaG90b0dhbGxlcnkgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgcGhvdG9HYWxsZXJ5IH0gZnJvbSAnLi9nYWxsZXJ5U2VydmljZS5qcyc7XG5cbmNvbnN0IGdhbGxlcmllcyA9IFsncG9ydHJhaXRzJywgJ2hlYWRzaG90cycsICdraWRzJ107XG5jb25zdCBwYWdlcyA9IFsnZnVsbHBhZ2UnLCAncG9ydGZvbGlvJywgJ2Fib3V0JywgJ2NvbnRhY3QnXTtcblxubGV0IHBob3RvcyA9IHBob3RvR2FsbGVyeS5ob21lcGFnZVBob3RvcygpLFxuICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpLFxuICAgICRwYWdlcyA9ICQoJy5wYWdlJyksXG4gICAgJGZ1bGxwYWdlQ29udGFpbmVyID0gJCgnI2Z1bGxwYWdlJyksXG4gICAgJHNlY3Rpb24gPSAkKCcjZnVsbHBhZ2UgPiAuc2VjdGlvbicpLFxuICAgICRnYWxsZXJ5ID0gJCgnLmdhbGxlcnknKSxcbiAgICAkZ2FsbGVyeUhlYWRlciA9ICQoJy5nYWxsZXJ5LWhlYWRlcicpLFxuICAgICRtZW51ID0gJCgnLm1lbnUnKSxcbiAgICAkc3VibWVudSA9ICQoJy5zdWJtZW51JyksXG4gICAgJG5hdmJhciA9ICQoJy5uYXZiYXInKSxcbiAgICAkZm9vdGVyID0gJCgnZm9vdGVyJyksXG4gICAgJGxvZ29Db250YWluZXIgPSAkKCcuZnVsbHBhZ2UgLmxvZ28tY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGVuZFNsaWRlcyhwaG90b3MpO1xuICBpbml0RnVsbHBhZ2UoKTtcblxuICByZWdpc3RlckV2ZW50cygpO1xuICBpbml0SnVzdGlmaWVkR2FsbGVyeSgnaGVhZHNob3RzJywgZmFsc2UpO1xuICBpbml0RHJvcGl0KCk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRzKCkge1xuICAvLyBzaG93IG9uZSBwYWdlIGF0IGEgdGltZSB3aGVuIGl0cyBsaW5rIGlzIGNsaWNrZWRcbiAgcGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgYC4ke3BhZ2V9LWxpbmtgLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRvZ2dsZVBhZ2VWaXNpYmlsaXR5KHBhZ2UpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyByZXBvcHVsYXRlIGdhbGxlcnkgZWFjaCB0aW1lIGEgbGluayBpcyBjbGlja2VkIGluIFBvcnRmb2xpbyBzdWJoZWFkZXJcbiAgZ2FsbGVyaWVzLmZvckVhY2goZ2FsbGVyeSA9PiB7XG4gICAgJHN1Ym1lbnUub24oJ2NsaWNrJywgYC4ke2dhbGxlcnl9LWxpbmtgLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBcbiAgICAgIGluaXRKdXN0aWZpZWRHYWxsZXJ5KGdhbGxlcnkpOyBcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVBhZ2VWaXNpYmlsaXR5KHBhZ2UpIHtcbiAgICRwYWdlcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAkKGAuJHtwYWdlfWApLnNob3coKTtcblxuICAgICAgdG9nZ2xlRm9vdGVyKHBhZ2UpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVGb290ZXIocGFnZSkge1xuICB2YXIgaXNGdWxscGFnZSA9IChwYWdlID09PSAnZnVsbHBhZ2UnKTtcbiAgXG4gICRmb290ZXIudG9nZ2xlKCFpc0Z1bGxwYWdlKTtcbiAgJGxvZ29Db250YWluZXIudG9nZ2xlKGlzRnVsbHBhZ2UpO1xufVxuXG5mdW5jdGlvbiBpbWFnZVRhZyhwaG90bywgdHlwZSA9ICdmdWxsc2l6ZScpIHtcbiAgdmFyIHBhdGhUb1Bob3RvID0gdHlwZSA9PT0gJ3RodW1ibmFpbCcgPyAndGh1bWInIDogJ3BhdGgnO1xuXG4gIHJldHVybiBgPGltZyBzcmM9JyR7cGhvdG9bcGF0aFRvUGhvdG9dfScgZGF0YS1ob21lcGFnZT0nJHtwaG90by5ob21lcGFnZX0nYCArICBcbiAgICBgIGRhdGEtY2F0ZWdvcnk9JyR7cGhvdG8uY2F0ZWdvcnl9JyBjbGFzcz0nc2xpZGUgJHt0eXBlfSc+YDsgICAgICAgIFxufVxuXG5mdW5jdGlvbiBpbWFnZUFuY2hvcihwaG90bykge1xuICByZXR1cm4gYDxhIGhyZWY9JyR7cGhvdG8ucGF0aH0nIGNsYXNzPSdpbWFnZS1hbmNob3InPiR7aW1hZ2VUYWcocGhvdG8sICd0aHVtYm5haWwnKX08L2E+YFxufVxuXG5mdW5jdGlvbiBhcHBlbmRTbGlkZXMocGhvdG9zKSB7XG4gIHZhciB0YWc7XG5cbiAgcGhvdG9zLmZvckVhY2gocGhvdG8gPT4ge1xuICAgIHRhZyA9IGltYWdlVGFnKHBob3RvKTtcblxuICAgICRzZWN0aW9uLmFwcGVuZCh0YWcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FsbGVyeSh0eXBlKSB7XG4gIHZhciAkZXhpc3RpbmdBbmNob3JzID0gJCgnLmltYWdlLWFuY2hvcicpLFxuICAgICAgdGFnLFxuICAgICAgcGhvdG9zO1xuXG4gIHBob3RvcyA9IHBob3RvR2FsbGVyeS5waG90b3NCeUNhdGVnb3J5KHR5cGUpO1xuXG4gIHNldEdhbGxlcnlIZWFkZXIodHlwZS50b1VwcGVyQ2FzZSgpKTtcbiAgJGV4aXN0aW5nQW5jaG9ycy5yZW1vdmUoKTsgICAgXG5cbiAgcGhvdG9zLmZvckVhY2gocGhvdG8gPT4ge1xuICAgIHRhZyA9IGltYWdlQW5jaG9yKHBob3RvKTtcblxuICAgICRnYWxsZXJ5LmFwcGVuZCh0YWcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0R2FsbGVyeUhlYWRlcih0ZXh0KSB7XG4gICRnYWxsZXJ5SGVhZGVyLnRleHQodGV4dClcbn1cblxuZnVuY3Rpb24gZ2xvYmFsUHJldmVudERlZmF1bHQoKSB7XG4gICRkb2N1bWVudC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRGdWxscGFnZSgpIHtcbiAgJGZ1bGxwYWdlQ29udGFpbmVyLmZ1bGxwYWdlKHtcbiAgICByZXNpemU6IGZhbHNlLFxuICAgIHNjcm9sbGluZ1NwZWVkOiAyMDAwLFxuICAgIGVhc2luZzogJ2Vhc2VPdXRTaW5lJyxcbiAgICBjb250cm9sQXJyb3dzOiBmYWxzZSxcbiAgICBhZnRlckxvYWQ6IHNldEludGVydmFsKGZ1bmN0aW9uKCl7ICQuZm4uZnVsbHBhZ2UubW92ZVNsaWRlUmlnaHQoKSB9LCAyMDAwKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdEp1c3RpZmllZEdhbGxlcnkodHlwZSA9ICdoZWFkc2hvdHMnLCB0cmlnZ2VyUG9ydGZvbGlvID0gdHJ1ZSkge1xuICBjcmVhdGVHYWxsZXJ5KHR5cGUpO1xuXG4gICRnYWxsZXJ5Lmp1c3RpZmllZEdhbGxlcnkoeyBtYXJnaW5zOiAyNSwgcm93SGVpZ2h0OiAxODAgfSkuXG4gICAgb24oJ2pnLmNvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmZpbmQoJ2EnKS5jb2xvcmJveCh7XG4gICAgICAgIG1heFdpZHRoIDogJzgwJScsXG4gICAgICAgIG1heEhlaWdodCA6ICc4MCUnLFxuICAgICAgICBvcGFjaXR5IDogMC44LFxuICAgICAgICB0cmFuc2l0aW9uIDogJ2VsYXN0aWMnLFxuICAgICAgICBzY3JvbGxpbmcgOiBmYWxzZSxcbiAgICAgICAgY3VycmVudCA6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gICk7XG4gIGlmICh0cmlnZ2VyUG9ydGZvbGlvKSB7XG4gICAgJCgnLnBvcnRmb2xpby1saW5rJykudHJpZ2dlcignY2xpY2snKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0RHJvcGl0KCkge1xuICAkbWVudS5kcm9waXQoe1xuICAgIGFjdGlvbjogJ21vdXNlZW50ZXInLFxuICAgIGJlZm9yZVNob3c6IGJlZm9yZURyb3BpdFNob3csXG4gICAgYWZ0ZXJIaWRlOiBhZnRlckRyb3BpdEhpZGVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZURyb3BpdFNob3coKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICcxNSUnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlckRyb3BpdEhpZGUoKSB7XG4gICRuYXZiYXIuY3NzKHtcbiAgICBoZWlnaHQ6ICczJSdcbiAgfSk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGluaXQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpbWFnZVJlZ2V4ID0gLyguanBnfC5wbmd8LmdpZnwudGlmZikvO1xuXG52YXIgYWxsUGhvdG9zO1xuXG5jbGFzcyBQaG90byB7XG4gIGNvbnN0cnVjdG9yIChwYXRoLCBjYXRlZ29yeSwgaG9tZXBhZ2UgPSBmYWxzZSwgdGh1bWIpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICB0aGlzLmhvbWVwYWdlID0gaG9tZXBhZ2U7XG4gICAgdGhpcy50aHVtYiA9IHRodW1iIHx8IHRvVGh1bWJuYWlsKHBhdGgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0b1RodW1ibmFpbChwYXRoKSB7XG4gIHZhciBmb3JtYXQgPSBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpLFxuICAgICAgdGh1bWJQbHVzRm9ybWF0ID0gYC10aHVtYiR7Zm9ybWF0fWA7XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZShpbWFnZVJlZ2V4LCB0aHVtYlBsdXNGb3JtYXQpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKHBhdGgpIHtcbiAgdmFyIGluZGV4ID0gcGF0aC5zZWFyY2goaW1hZ2VSZWdleCk7XG4gIFxuICByZXR1cm4gcGF0aC5zbGljZShpbmRleClcbn1cblxuYWxsUGhvdG9zID0gW1xuICBuZXcgUGhvdG8oJy4vaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS01LmpwZycsICdwb3J0cmFpdHMnLCB0cnVlKSxcbiAgbmV3IFBob3RvKCcuL2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnaGVhZHNob3RzJyksXG4gIG5ldyBQaG90bygnLi9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTcuanBnJywgJ2tpZHMnLCB0cnVlKSxcbiAgbmV3IFBob3RvKCcuL2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtOC5qcGcnLCAncG9ydHJhaXRzJyksXG4gIG5ldyBQaG90bygnLi9pbWFnZXMvbnloLXNpdGUtY292ZXJwYWdlLTkuanBnJywgJ2tpZHMnKSxcbiAgbmV3IFBob3RvKCcuL2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtMTIuanBnJywgJ2hlYWRzaG90cycsIHRydWUpLFxuICBuZXcgUGhvdG8oJy4vaW1hZ2VzL255aC1zaXRlLWNvdmVycGFnZS01LmpwZycsICdwb3J0cmFpdHMnKSxcbiAgbmV3IFBob3RvKCcuL2ltYWdlcy9ueWgtc2l0ZS1jb3ZlcnBhZ2UtNi5qcGcnLCAnaGVhZHNob3RzJywgdHJ1ZSlcbl07XG5cbmV4cG9ydCB7IGFsbFBob3RvcyB9OyBcbiJdfQ==
