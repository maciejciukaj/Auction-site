import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Advertisment } from '../_models/advertisment';
import { Vehicle } from '../_models/vehicle';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.scss'],
})
export class AdvertFormComponent implements OnInit {
  currentUser: any = {};
  name: any;
  pass: any = {};
  step: number = 0;
  vehicleData: any = {};
  advertismentData: any = {};

  vehicle: Vehicle = {
    type: 'combi',
    brand: 'chevrolet',
    model: 'camaro',
    color: 'yellow',
    power: 400,
    engine: 5,
    isCrashed: false,
    mileage: 12,
    productionYear: 2020,
    userId: null,
  };

  advertisment: Advertisment = {
    title: 'bmw na sprzedaz',
    description: 'super ekstra',
    price: '100000',
    userId: null,
    vehicleId: null,
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public accountService: AccountService,
    public router: Router
  ) {}

  ngOnInit(): void {
    //this.getUser();

    //console.log(this.vehicle);
  }
  nextStep() {
    if (this.step < 3) this.step = this.step + 1;
    if (this.step == 3) {
      this.router.navigateByUrl('/main');
    }
  }

  previousStep() {
    if (this.step > 0) this.step = this.step - 1;
  }

  getUser() {
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    this.http
      .get('https://localhost:5001/api/user/getUsers/' + this.name.userName)
      .subscribe({
        next: (response) => (
          (this.pass = response),
          ((this.vehicleData.userId = this.pass.userId), this.addVehicle()) //tu ma byc jeszcze wywolanie funkcji add Vehicle, ogarnac cascade i walidacje hasla
        ),
        error: (error) => console.log(error),
      });
  }

  addVehicle() {
    this.http
      .post('https://localhost:5001/api/vehicle/addVehicles', this.vehicleData)
      .subscribe({
        next: (response) => (
          (this.pass = response),
          (this.advertismentData.vehicleId = this.pass.vehicleId),
          (this.advertismentData.userId = this.pass.userId),
          console.log(this.advertismentData),
          this.toastr.success('super'),
          this.addAdvertisment()
        ),
        error: (error) => console.log(error),
      });
  }

  addAdvertisment() {
    this.http
      .post(
        'https://localhost:5001/api/advertisment/addAdvertisment',
        this.advertismentData
      )
      .subscribe({
        next: (response) => this.toastr.success('dodano ogloszenie'),
        error: (error) => console.log(error),
      });
  }
  showLog() {
    console.log(this.advertismentData);
    console.log(this.vehicleData);
  }
}
