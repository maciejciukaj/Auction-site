import { FormControl, FormGroup, Validators } from '@angular/forms';

export class advFormControl {
  editForm = new FormGroup({
    title: new FormControl(null, [
      Validators.minLength(10),
      Validators.maxLength(40),
    ]),
    type: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [
      Validators.minLength(1),
      Validators.maxLength(15),
    ]),
    price: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    description: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
    productionYear: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
    color: new FormControl(null, [Validators.required]),
    mileage: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
    power: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
    gearbox: new FormControl(null, [Validators.required]),
    fuel: new FormControl(null, [Validators.required]),
    engine: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
  });
}
