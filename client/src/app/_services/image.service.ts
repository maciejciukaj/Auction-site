import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    position: 0,
    vehicleId: 0,
  };

  constructor(private firebase: AngularFireDatabase, private http: HttpClient, private storage: AngularFireStorage) {
    this.getImageDetailList();
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('vehicleImages');
  }

  insertImageDetails(imageDetails) {
    this.dataset = {
      isMain: imageDetails.isMain,
      photoUrl: imageDetails.photoUrl,
      position: imageDetails.position,
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
  delete(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
  
  
}
