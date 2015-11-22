import { allPhotos, allThumbnails } from './photoService.js'

let photoGallery;

class Gallery {
  constructor() {}

  allPhotos(type = 'fullsize') { 
    return type === 'thumbnail' ? allThumbnails : allPhotos;
  }

  homepagePhotos(type = 'fullsize') {
    var photoStore = type === 'thumbnail' ? allThumbnails : allPhotos;

    return this.photoStore.filter(photo => photo['homepage'] === true);
  }
  
  photosByCategory(category, type = 'fullsize') {
    var photoStore = type === 'thumbnail' ? allThumbnails : allPhotos;

    return this.photoStore.filter(photo => photo['category'] === category);
  }
}

photoGallery = new Gallery();

export { photoGallery };
