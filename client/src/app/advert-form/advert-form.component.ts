import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Advertisment } from '../_models/advertisment';
import { Vehicle } from '../_models/vehicle';
import { AccountService } from '../_services/account.service';
import { ImageService } from '../_services/image.service';

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
  imgSrc: string;
  selectedImage: any = null;
  isSubmitter: boolean;

  vehicle: Vehicle = {
    type: '',
    brand: '',
    model: '',
    color: '',
    power: null,
    engine: null,
    isCrashed: false,
    mileage: null,
    productionYear: null,
    userId: null,
  };

  advertisment: Advertisment = {
    title: '',
    description: '',
    price: '',
    userId: null,
    vehicleId: null,
  };

  formTemplate = new FormGroup({
    caption: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public accountService: AccountService,
    public router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.resetForm();
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

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img_placeholder/img_placeholder.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitter = true;
    if (this.formTemplate.valid) {
      var filePath = `images/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.resetForm();
            });
          })
        )
        .subscribe();
      this.nextStep();
    }
  }

  formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: '',
    });
    this.imgSrc = '/assets/img_placeholder/img_placeholder.png';
    this.isSubmitter = false;
    this.selectedImage = null;
  }

  createAdvertisment() {
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
    this.showLog();
    this.http
      .post('https://localhost:5001/api/vehicle/addVehicles', this.vehicle)
      .subscribe({
        next: (response) => (
          (this.pass = response),
          (this.advertisment.vehicleId = this.pass.vehicleId),
          (this.advertisment.userId = this.pass.userId),
          console.log(this.advertisment),
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
        this.advertisment
      )
      .subscribe({
        next: (response) => (
          this.toastr.success('dodano ogloszenie'),
          this.router.navigateByUrl('/main')
        ),
        error: (error) => console.log(error),
      });
  }
  showLog() {
    console.log(this.advertisment);
    console.log(this.vehicle);
  }
}
