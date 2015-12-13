'use strict';

const imageRegex = /(.jpg|.png|.gif|.tiff)/;

var allPhotos;

class Photo {
  constructor (path, category, homepage = false, thumb) {
    this.path = path;
    this.category = category;
    this.homepage = homepage;
    this.thumb = thumb || toThumbnail(path);
  }
};

function toThumbnail(path) {
  var format = getFileExtension(path),
      thumbPlusFormat = `-thumb${format}`;

  return path.replace(imageRegex, thumbPlusFormat);
}

function getFileExtension(path) {
  var index = path.search(imageRegex);
  
  return path.slice(index)
}

allPhotos = [
  new Photo('./images/nyh-site-coverpage-5.jpg', 'portraits', true),
  new Photo('./images/nyh-site-coverpage-6.jpg', 'headshots'),
  new Photo('./images/nyh-site-coverpage-7.jpg', 'kids', true),
  new Photo('./images/nyh-site-coverpage-8.jpg', 'portraits'),
  new Photo('./images/nyh-site-coverpage-9.jpg', 'kids'),
  new Photo('./images/nyh-site-coverpage-12.jpg', 'headshots', true),
  new Photo('./images/nyh-site-coverpage-5.jpg', 'portraits'),
  new Photo('./images/nyh-site-coverpage-6.jpg', 'headshots', true)
];

export { allPhotos }; 
