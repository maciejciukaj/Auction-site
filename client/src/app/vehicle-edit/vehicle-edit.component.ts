import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import {
  AdvertismentEditControl,
  VehicleEditControl,
} from '../_models/editControl';
import {
  BrandClass,
  ColorClass,
  FuelClass,
  GearboxClass,
  TypeClass,
} from '../_models/vehicle';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss'],
})
export class VehicleEditComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  @Input() vehicle: any = {};
  @Input() advertisment: any = {};
  types = new TypeClass();
  brands = new BrandClass();
  colors = new ColorClass();
  fuel = new FuelClass();
  gearbox = new GearboxClass();

  vehicleControl = new VehicleEditControl();
  advertismentControl = new AdvertismentEditControl();
  vehicleDetailsControl = this.vehicleControl.vehicleDetails;
  advertismentDetailsControl = this.advertismentControl.advDetails;
  constructor(public cardService: CardService, private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log(this.advertisment.description);
    this.vehicleDetailsControl.controls['vehicleId'].setValue(
      this.vehicle.vehicleId
    );
    this.advertismentDetailsControl.controls['advertismentId'].setValue(
      this.advertisment.advertismentId
    );
    this.advertismentDetailsControl.controls['description'].setValue(
      this.advertisment.description
    );
  }

  editVehicle() {
    this.cardService
      .editVehicleInfo(this.vehicleDetailsControl.value)
      .subscribe((response) => {
        this.toastr.success('Vehicle info updated');
        //this.cancel();
      });
  }
  cancel() {
    this.cancelEdit.emit(false);
  }

  editAdvertisment() {
    this.cardService
      .editAdvertismentInfo(this.advertismentDetailsControl.value)
      .subscribe((response) => {
        this.toastr.success('Advertisment info updated');
        //this.cancel();
      });
  }

  showData() {
    console.log(this.vehicle.vehicleId);

    console.log(this.vehicleDetailsControl.value);
    console.log(this.advertismentDetailsControl.value);
  }
}
