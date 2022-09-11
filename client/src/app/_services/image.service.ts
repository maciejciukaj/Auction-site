import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { Image } from '../_models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imageDetailList: AngularFireList<any>;
  imageElement: Image;

  dataset: Image = {
    main: false,
    imageUrl: '',
  };

  constructor(private firebase: AngularFireDatabase) {
    this.getImageDetailList();
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('vehicleImages');
  }

  insertImageDetails(imageDetails) {
    this.dataset = {
      main: imageDetails.main,
      imageUrl: imageDetails.imageUrl,
    };
    this.imageDetailList.push(this.dataset);
  }
}
