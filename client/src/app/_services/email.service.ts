import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {}

  sendEmail(model: any) {
    return this.http.post(this.baseUrl + 'email/sendEmail', model);
  }
}
