'use strict';

let photoService = function () {
  var photos;

  class Photo {
    constructor (path, category, title) {
      this.path = path;
      this.category = category;
      this.title = title || 'title';
    }
  };
 
  photos = [
    new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'),
    new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'),
    new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids'),
    new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'),
    new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'),
    new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots'),
    new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'),
    new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'),
    new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids'),
    new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'),
    new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'),
    new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots')
  ];

  return photos;
};

export default photoService;