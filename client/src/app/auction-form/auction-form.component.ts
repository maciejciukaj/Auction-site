import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {
  BrandClass,
  ColorClass,
  FuelClass,
  GearboxClass,
  TypeClass,
  Vehicle,
  VehicleClass,
} from '../_models/vehicle';
import { AccountService } from '../_services/account.service';
import { ImageService } from '../_services/image.service';
import { AuctionClass, DurationClass } from '../_models/auction';
import { aucFormControl } from '../_models/aucFormControl';
@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss'],
})
export class AuctionFormComponent implements OnInit {
  currentUser: any = {};
  name: any;
  pass: any = {};
  step: number = 0;
  imgSrc: string;
  selectedImage: any = null;
  previewPhotos: any = [];
  addedPhotos: any = [];

  editMode = false;

  vehicle = new VehicleClass();
  types = new TypeClass();
  brands = new BrandClass();
  colors = new ColorClass();
  fuel = new FuelClass();
  gearbox = new GearboxClass();
  duration = new DurationClass();

  auction = new AuctionClass();

  aucDetails = new aucFormControl();
  aucControl = this.aucDetails.aucDetails;

  formTemplate = new FormGroup({
    isMain: new FormControl(false),
    photoUrl: new FormControl(''),
    position: new FormControl(0),
    vehicleId: new FormControl(0),
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public accountService: AccountService,
    public router: Router,
    private storage: AngularFireStorage,
    private service: ImageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.brands.brandList.sort();
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

  addPhotoToPreview() {
    if (this.selectedImage != null) {
      if (this.previewPhotos.length < 8) {
        this.previewPhotos.push(this.imgSrc);
        this.addedPhotos.push(this.selectedImage);
      } else {
        this.toastr.error('You reached max 8 photos');
      }
      this.resetForm();

      if (this.previewPhotos.length == 1)
        this.toastr.success(
          "To change it enter 'Preview photos' page ",
          'Main photo added',
          {
            timeOut: 4000,
          }
        );
    } else {
      this.toastr.error('No photo has been selected');
    }
  }

  savePhoto(formValue, file: File, main: boolean, position: number) {
    var filePath = `images/${file.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['photoUrl'] = url;
            formValue['isMain'] = main;
            formValue['position'] = position;
            console.log(formValue);
            this.service.addPhoto(formValue).subscribe({
              next: (response) => console.log('dodano zdjecie'),
              error: (error) => console.log(error),
            });
            this.service.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      )
      .subscribe();
  }

  saveList() {
    console.log(this.formTemplate.value);
    if (this.addedPhotos.length > 0) {
      this.addedPhotos.forEach(
        (elem, ind) => {
          if (ind == 0) {
            this.savePhoto(this.formTemplate.value, elem, true, ind);
          } else {
            this.savePhoto(this.formTemplate.value, elem, false, ind);
          }
        },
        this.toastr.success('added'),
        this.nextStep()
      );
    } else {
      this.toastr.error('Add at least one photo');
    }
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      isMain: false,
      photoUrl: '',
      position: 0,
      vehicleId: 0,
    });
    this.imgSrc = '/assets/img_placeholder/img_placeholder.png';

    this.selectedImage = null;
  }

  createAuction() {
    this.splitValues();
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    this.http
      .get('https://localhost:5001/api/user/getUsers/' + this.name.userName)
      .subscribe({
        next: (response) => (
          (this.pass = response),
          ((this.vehicle.userId = this.pass.userId), this.addVehicle())
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
          (this.auction.vehicleId = this.pass.vehicleId),
          (this.formTemplate.value.vehicleId = this.pass.vehicleId),
          (this.auction.userId = this.pass.userId),
          this.addAuction()
        ),
        error: (error) => console.log(error),
      });
  }
  checkPhotos() {
    if (this.addedPhotos.length > 0) {
      this.nextStep();
    } else {
      this.toastr.warning('Add at least one photo');
    }
  }

  addAuction() {
    this.http
      .post('https://localhost:5001/api/auction/addAuction', this.auction)
      .subscribe({
        next: (response) => (
          this.saveList(),
          this.toastr.success('Auction added'),
          this.router.navigateByUrl('/main')
        ),
        error: (error) => console.log(error),
      });
  }
  showLog() {
    this.splitValues();
    console.log(this.auction);
    console.log(this.vehicle);
  }

  editToggle() {
    this.editMode = !this.editMode;
    this.resetForm();
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
  }
  get f() {
    return this.aucControl.controls;
  }

  formControls() {
    return this.formTemplate['controls'];
  }
  splitValues() {
    this.auction.title = this.aucControl.get('title').value;
    this.auction.price = this.aucControl.get('price').value;
    this.auction.description = this.aucControl.get('description').value;
    this.auction.duration = this.aucControl.get('duration').value;
    this.vehicle.brand = this.aucControl.get('brand').value;
    this.vehicle.model = this.aucControl.get('model').value;
    this.vehicle.type = this.aucControl.get('type').value;
    this.vehicle.productionYear = this.aucControl.get('productionYear').value;
    this.vehicle.engine = this.aucControl.get('engine').value;
    this.vehicle.mileage = this.aucControl.get('mileage').value;
    this.vehicle.gearbox = this.aucControl.get('gearbox').value;
    this.vehicle.color = this.aucControl.get('color').value;
    this.vehicle.isCrashed = this.aucControl.get('isCrashed').value;
    this.vehicle.power = this.aucControl.get('power').value;
    this.vehicle.fuel = this.aucControl.get('fuel').value;
  }
}
