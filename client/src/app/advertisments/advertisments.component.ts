import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdvertismentService } from '../_services/advertisment.service';

@Component({
  selector: 'app-advertisments',
  templateUrl: './advertisments.component.html',
  styleUrls: ['./advertisments.component.scss'],
})
export class AdvertismentsComponent implements OnInit {
  advertisments: any = [];
  vehicles: any = [];
  constructor(
    private http: HttpClient,
    private advertService: AdvertismentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdvertisments();
  }

  getAdvertisments() {
    this.advertService.getAdvertisments().subscribe(
      (response) => (
        (this.advertisments = response),
        this.advertisments.forEach((a) => this.getVehicles(a.advertismentId))
      ),
      (error) => this.toastr.error("Can't load adverts")
    );
  }

  getVehicles(id: number) {
    this.http
      .get('https://localhost:5001/api/vehicle/getVehicle/' + id)
      .subscribe((response) => this.vehicles.push(response));
  }
}
