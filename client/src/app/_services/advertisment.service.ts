import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdvertismentService {
  baseUrl = 'https://localhost:5001/api/card/';

  constructor(private http: HttpClient) {}

  getAdvertisments() {
    return this.http.get(this.baseUrl + 'getCards');
  }

  getAdvertismentsByPage(page: any) {
    return this.http.get(this.baseUrl + 'getCardsByPage/', page);
  }

  getNumberOfAdvertisments(config: any) {
    return this.http.get(this.baseUrl + 'getNumberOfCards', config);
  }
}
