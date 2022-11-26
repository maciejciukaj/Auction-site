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
    if (this.validationVehicle()) {
      this.cardService
        .editVehicleInfo(this.vehicleDetailsControl.value)
        .subscribe((response) => {
          this.toastr.success('Vehicle info updated');
        });
    }
  }
  cancel() {
    this.cancelEdit.emit(false);
  }

  editAdvertisment() {
    if (this.validationAdvert()) {
      this.cardService
        .editAdvertismentInfo(this.advertismentDetailsControl.value)
        .subscribe((response) => {
          this.toastr.success('Advertisment info updated');
        });
    }
  }

  showData() {
    console.log(this.vehicle.vehicleId);
    console.log(this.vehicleDetailsControl.value);
    console.log(this.advertismentDetailsControl.value);
  }
  validationVehicle() {
    if (!this.vehicleDetailsControl.get('model').valid) {
      this.toastr.error('Wrong model');
      return false;
    } else if (!this.vehicleDetailsControl.get('productionYear').valid) {
      this.toastr.error('Wrong production year');
      return false;
    } else if (!this.vehicleDetailsControl.get('mileage').valid) {
      this.toastr.error('Wrong mileage');
      return false;
    } else if (!this.vehicleDetailsControl.get('power').valid) {
      this.toastr.error('Wrong engine power');
      return false;
    } else if (!this.vehicleDetailsControl.get('engine').valid) {
      this.toastr.error('Wrong capacity');
      return false;
    }
    return true;
  }
  validationAdvert() {
    if (!this.advertismentDetailsControl.get('title').valid) {
      this.toastr.error('Wrong title');
      return false;
    } else if (!this.advertismentDetailsControl.get('price').valid) {
      this.toastr.error('Wrong price');
      return false;
    } else if (!this.advertismentDetailsControl.get('description').valid) {
      this.toastr.error('Wrong description');
      return false;
    }
  }
}
