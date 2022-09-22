import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    config: NgbCarouselConfig
  ) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
    
  }

  ngOnInit(): void {
    //this.advertId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getCard();
    console.log(this.advertId);
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
        });
    });
  }
}
