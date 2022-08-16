import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  vehicle: Vehicle = {
    type: 'coupe',
    brand: 'bmw',
    model: '7',
    price: 20000,
    color: 'black',
    power: 300,
    engine: 5,
    isCrashed: false,
    mileage: 12,
    productionYear: 2020,
    userId: null,
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUser();

    console.log(this.vehicle);
  }

  getUser() {
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    this.http
      .get('https://localhost:5001/api/user/getUsers/' + this.name.userName)
      .subscribe({
        next: (response) => (
          (this.pass = response),
          ((this.vehicle.userId = this.pass.userId), this.addVehicle()) //tu ma byc jeszcze wywolanie funkcji add Vehicle, ogarnac cascade i walidacje hasla
        ),
        error: (error) => console.log(error),
      });
  }

  addVehicle() {
    this.http
      .post('https://localhost:5001/api/vehicle/addVehicles', this.vehicle)
      .subscribe({
        next: (response) => this.toastr.success('poszlo'),
        error: (error) => console.log(error),
      });
  }
}
