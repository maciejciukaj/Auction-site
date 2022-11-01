import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  getAuctionById(cardId: any) {
    return this.http.get(this.baseUrl + 'getAuction/' + cardId);
  }
}
