import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getCardById(cardId: any) {
    return this.http.get(this.baseUrl + 'card/getCard/' + cardId);
  }

  getVehicleById(vehicleId: any) {
    return this.http.get(this.baseUrl + 'vehicle/getVehicle/' + vehicleId);
  }

  deleteCard(id: any) {
    return this.http.delete(this.baseUrl + 'vehicle/deleteVehicle/' + id);
  }
}
