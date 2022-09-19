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
}
