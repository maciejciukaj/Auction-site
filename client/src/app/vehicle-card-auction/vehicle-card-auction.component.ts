import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { PhotoLightbox } from '../_models/lightbox';
import { AuctionService } from '../_services/auction.service';
import { CardService } from '../_services/card.service';
import { LightboxOverlayComponent } from 'ngx-lightbox/lightbox-overlay.component';

@Component({
  selector: 'app-vehicle-card-auction',
  templateUrl: './vehicle-card-auction.component.html',
  styleUrls: ['./vehicle-card-auction.component.scss'],
  providers: [NgbCarouselConfig],
})
export class VehicleCardAuctionComponent implements OnInit {
  auctionId: any;
  card: any = {};
  vehicle: any = {};
  photo: PhotoLightbox = { src: '', position: 0 };
  album: any = [];
  owner: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,

    private confirmationDialogService: ConfirmationDialogService,
    config: NgbCarouselConfig,
    private _lightbox: Lightbox,
    private auctionService: AuctionService,
    private _lightboxConfig: LightboxConfig,
    public cardService: CardService,
    private router: Router
  ) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    _lightboxConfig.fadeDuration = 1;
    _lightboxConfig.centerVertically = true;
  }

  ngOnInit(): void {
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

  getId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.auctionId = params.get('id');
    });
   
  }

  getCard() {
    this.getId();
    this.cardService.getAuctionById(this.auctionId).subscribe((response) => {
      this.card = response;
     

      this.cardService.getUserById(this.card.userId).subscribe((response) => {
        this.owner = response;
        console.log(this.owner);
      });
      this.cardService
        .getVehicleById(this.card.vehicleId)
        .subscribe((response) => {
          this.vehicle = response;
          //this.cardService.getVehicleById

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
            .deleteCard(this.auctionId, this.vehicle.photos)
            .subscribe(
              (response) => {
                this.router.navigateByUrl('/myAuc');
              },
              (error) => console.log(error)
            );
        }
      })

      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
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
}
