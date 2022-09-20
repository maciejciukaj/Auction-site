import { HttpClient, HttpParams } from '@angular/common/http';
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
  currentPage: any = 1;
  numberOfAllCards: any;
  vehiclesSorted: any = [];
  liczba: string = '1';

  constructor(
    private http: HttpClient,
    private advertService: AdvertismentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNumberOfAllAdvertisments();
    this.getAdvertisments();
  }

  getNumberOfAllAdvertisments() {
    this.advertService
      .getNumberOfAdvertisments()
      .subscribe(
        (response) => (
          (this.numberOfAllCards = response), console.log(this.numberOfAllCards)
        )
      );
  }

  getAdvertisments() {
    this.http
      .get('https://localhost:5001/api/card/getCardsByPage/' + this.currentPage)
      .subscribe(
        (response) => {
          this.advertisments = response;
          /* this.advertisments.forEach((a, idx, arr) => {
          idx === arr.length - 1
            ? this.getVehicles(a.advertismentId, false)
            : this.getVehicles(a.advertismentId, true);
        }),*/
          for (var i = 0; i < this.advertisments.length; i++) {
            if (i === this.advertisments.length - 1) {
              console.log('geee');
              this.getVehicles(this.advertisments[i].advertismentId, true);
            } else {
              this.getVehicles(this.advertisments[i].advertismentId, false);
            }
          }
          console.log(this.advertisments);
          console.log(this.vehicles);
        },
        (error) => this.toastr.error("Can't load adverts")
      );
  }

  getVehicles(id: number, isLast: boolean) {
    this.http
      .get('https://localhost:5001/api/vehicle/getVehicle/' + id)
      .subscribe((response) => {
        this.vehicles.push(response),
          // isLast ? this.sortVehicles() : console.log('w funkcji nie sort');
          this.sortVehicles();
      });
  }

  sortVehicles() {
    this.vehicles.sort((a, b) => a.vehicleId - b.vehicleId);
    console.log('here');
  }

  nextPage() {
    if (this.currentPage * 6 + 1 <= this.numberOfAllCards) {
      this.currentPage = this.currentPage + 1;
      this.vehicles = [];
      console.log(this.currentPage);
      this.getAdvertisments();
    }
  }
  previousPage() {
    if (this.currentPage - 1 > 0) {
      this.currentPage = this.currentPage - 1;
      this.vehicles = [];
      console.log(this.currentPage);
      this.getAdvertisments();
    }
  }
}
