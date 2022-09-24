import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { PhotoLightbox } from '../_models/lightbox';

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
  photo: PhotoLightbox = { src: '' };
  album: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    config: NgbCarouselConfig,
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig
  ) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    _lightboxConfig.fadeDuration = 1;
    _lightboxConfig.centerVertically = true;
  }

  ngOnInit(): void {
    //this.advertId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getCard();
    console.log(this.advertId);
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  saveLightboxPhotos() {
    for (let i = 0; i < this.vehicle.photos.length; i++) {
      this.photo.src = this.vehicle.photos[i].photoUrl;
      this.album.push(this.photo);
      this.photo = { src: '' };
    }
    console.log(this.album);
  }

  getId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.advertId = params.get('id');
    });
  }

  getCard() {
    this.getId();
    this.cardService.getCardById(this.advertId).subscribe((response) => {
      this.card = response;
      console.log(response);
      this.cardService
        .getVehicleById(this.card.advertismentId)
        .subscribe((response) => {
          this.vehicle = response;
          this.saveLightboxPhotos();
        });
    });
  }
}
