import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = 'https://localhost:5001/api/card/';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getCardById(cardId: any) {
    return this.http.get(this.baseUrl + 'getCard/' + cardId);
  }
}
