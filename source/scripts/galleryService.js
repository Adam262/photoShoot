import { allPhotos } from './photoService.js'

let photoGallery;

class Gallery {
  allPhotos() { 
    return allPhotos;
  }

  homepagePhotos() {
    return allPhotos.filter(photo => photo['homepage'] === true);
  }
  
  photosByCategory(category) {
    return allPhotos.filter(photo => photo['category'] === category);
  }
}

photoGallery = new Gallery();

export { photoGallery };
