import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { PhotoLightbox } from '../_models/lightbox';
import { AccountService } from '../_services/account.service';

import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  providers: [NgbCarouselConfig],
})
export class VehicleCardComponent implements OnInit {
  advertId: any;
  card: any = {};
  vehicle: any = {};
  photo: PhotoLightbox = { src: '', position: 0 };
  album: any = [];
  owner: any = {};
  name: any;
  editMode: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public cardService: CardService,
    private confirmationDialogService: ConfirmationDialogService,
    config: NgbCarouselConfig,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig,
    private router: Router,
    private accountService: AccountService
  ) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    _lightboxConfig.fadeDuration = 1;
    _lightboxConfig.centerVertically = true;
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((val) => (this.name = val));

    this.getCard();
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  saveLightboxPhotos() {
    for (let i = 0; i < this.vehicle.photos.length; i++) {
      this.photo.src = this.vehicle.photos[i].photoUrl;
      this.photo.position = this.vehicle.photos[i].position;
      this.album.push(this.photo);
      this.photo = { src: '', position: 0 };
    }
    this.album.sort((a, b) => a.position - b.position);
    console.log(this.album);
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
    this.album = [];
    this.getCard();
  }

  getId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.advertId = params.get('id');
    });
    console.log(this.advertId);
  }

  getCard() {
    this.getId();
    this.cardService.getCardById(this.advertId).subscribe((response) => {
      this.card = response;
      this.cardService.getUserById(this.card.userId).subscribe((response) => {
        this.owner = response;
        console.log(this.owner);
      });
      this.cardService
        .getVehicleById(this.card.advertismentId)
        .subscribe((response) => {
          this.vehicle = response;
          this.saveLightboxPhotos();
        });
    });
  }

  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm('Please confirm', 'Do you really want to delete advertisment ?')
      .then((confirmed) => {
        if (confirmed) {
          this.cardService
            .deleteCard(this.card.vehicleId, this.vehicle.photos)
            .subscribe(
              (response) => {
                this.router.navigateByUrl('/myAuc');
              },
              (error) => console.log(error)
            );
        }
      })
      .catch(() => console.log('User dismissed the dialog'));
  }

  collapse() {
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
    }
  }

  checkIfOwner() {
    if (this.owner.username == this.name.userName) {
      return true;
    } else return false;
  }

  editToggle() {
    this.editMode = !this.editMode;
  }
}
