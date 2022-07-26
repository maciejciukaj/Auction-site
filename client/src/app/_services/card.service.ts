import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService
  ) {}

  getCardById(cardId: any) {
    return this.http.get(this.baseUrl + 'card/getCard/' + cardId);
  }

  getAuctionById(cardId: any) {
    return this.http.get(this.baseUrl + 'auction/getAuction/' + cardId);
  }

  getVehicleById(vehicleId: any) {
    return this.http.get(this.baseUrl + 'vehicle/getVehicle/' + vehicleId);
  }

  deleteCard(id: any, imageList: any) {
    this.deleteImagesFromStorage(imageList);
    return this.http.delete(this.baseUrl + 'vehicle/deleteVehicle/' + id);
  }

  deleteImagesFromStorage(imageList: any) {
    imageList.forEach((element) => {
      this.imageService.delete(element.photoUrl);
    });
  }
  numberWithSpaces(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getUserById(userId: any) {
    return this.http.get(this.baseUrl + 'user/getUserById/' + userId);
  }

  getCurrentPrice(auctionId: number) {
    return this.http.get(this.baseUrl + 'auction/getCurrentPrice/' + auctionId);
  }

  editVehicleInfo(model: any) {
    return this.http.put(this.baseUrl + 'vehicle/editVehicle', model);
  }

  editAdvertismentInfo(model: any) {
    return this.http.put(this.baseUrl + 'card/editCard', model);
  }
}
