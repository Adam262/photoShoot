'use strict';

var allPhotos,
    allThumbnails;

class Photo {
  constructor (path, category, homepage = false) {
    this.path = path;
    this.category = category;
    this.homepage = homepage;
  }
};

allPhotos = [
  new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits', true),
  new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots'),
  new Photo('./dist/images/nyh-site-coverpage-7.jpg', 'Kids', true),
  new Photo('./dist/images/nyh-site-coverpage-8.jpg', 'Portraits'),
  new Photo('./dist/images/nyh-site-coverpage-9.jpg', 'Kids'),
  new Photo('./dist/images/nyh-site-coverpage-12.jpg', 'Headshots', true),
  new Photo('./dist/images/nyh-site-coverpage-5.jpg', 'Portraits'),
  new Photo('./dist/images/nyh-site-coverpage-6.jpg', 'Headshots', true)
];

allThumbnails = [
  new Photo('./dist/images/nyh-site-coverpage-5-thumb.jpg', 'Portraits', true),
  new Photo('./dist/images/nyh-site-coverpage-6-thumb.jpg', 'Headshots'),
  new Photo('./dist/images/nyh-site-coverpage-7-thumb.jpg', 'Kids', true),
  new Photo('./dist/images/nyh-site-coverpage-8-thumb.jpg', 'Portraits'),
  new Photo('./dist/images/nyh-site-coverpage-9-thumb.jpg', 'Kids'),
  new Photo('./dist/images/nyh-site-coverpage-12-thumb.jpg', 'Headshots', true),
  new Photo('./dist/images/nyh-site-coverpage-5-thumb.jpg', 'Portraits'),
  new Photo('./dist/images/nyh-site-coverpage-6-thumb.jpg', 'Headshots', true)
];

export { allPhotos, allThumbnails }; 
