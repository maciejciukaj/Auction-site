import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  addOffer(model: any) {
    return this.http.post(this.baseUrl + 'offer/addOffer/', model);
  }
  getUserId(username: string) {
    return this.http.get(this.baseUrl + 'user/getUsers/' + username);
  }
  updateCurrentPrice(newPrice: any) {
    return this.http.post(this.baseUrl + 'auction/editCurrentPrice', newPrice);
  }

  getHighestOffers(username: string) {
    return this.http.get(
      this.baseUrl + 'user/getUserHighestOffers/' + username
    );
  }
  numberWithSpaces(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
