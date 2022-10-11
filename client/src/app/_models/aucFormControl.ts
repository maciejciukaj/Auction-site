import { FormControl, FormGroup, Validators } from '@angular/forms';

export class aucFormControl {
  aucDetails = new FormGroup({
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
    duration: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.minLength(50),
      Validators.maxLength(5000),
    ]),
    productionYear: new FormControl(null, [
      Validators.pattern(/(?:(?:19|20)[0-9]{2})/),
    ]),
    color: new FormControl(null, [Validators.required]),
    mileage: new FormControl(null, [
      Validators.minLength(1),
      Validators.maxLength(6),
    ]),
    power: new FormControl(null, [
      Validators.minLength(2),
      Validators.maxLength(4),
    ]),
    gearbox: new FormControl(null, [Validators.required]),
    fuel: new FormControl(null, [Validators.required]),
    engine: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(4),
    ]),
    isCrashed: new FormControl(false, [Validators.required]),
  });
}
// (/[2]{1}[])
