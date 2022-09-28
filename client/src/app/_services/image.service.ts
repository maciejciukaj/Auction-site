import { HttpClient } from '@angular/common/http';
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
  baseUrl = 'https://localhost:5001/api/photo/';
  imageDetailList: AngularFireList<any>;
  imageElement: Image;

  dataset: Image = {
    isMain: false,
    photoUrl: '',
    vehicleId: 0,
  };

  constructor(private firebase: AngularFireDatabase, private http: HttpClient) {
    this.getImageDetailList();
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('vehicleImages');
  }

  insertImageDetails(imageDetails) {
    this.dataset = {
      isMain: imageDetails.isMain,
      photoUrl: imageDetails.photoUrl,
      vehicleId: imageDetails.vehicleId,
    };
    this.imageDetailList.push(this.dataset);
  }

  addPhoto(model: any) {
    return this.http.post(this.baseUrl + 'addPhoto/', model);
  }
  searchForMain(photos: any) {
    for (let i = 0; i < photos?.length; i++) {
      if (photos[i].isMain) {
        return photos[i].photoUrl;
      }
    }
  }
}
