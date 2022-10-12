import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defaultCipherList } from 'constants';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  baseUrl = 'https://localhost:5001/api/auction/';

  constructor(private http: HttpClient) {}

  getAdvertisments() {
    return this.http.get(this.baseUrl + 'getAuctions');
  }

  getAdvertismentsByPage(page: any) {
    return this.http.get(this.baseUrl + 'getAuctionsByPage/', page);
  }

  getNumberOfAdvertisments() {
    return this.http.get(this.baseUrl + 'getNumberOfAuctions');
  }
  numberWithSpaces(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
