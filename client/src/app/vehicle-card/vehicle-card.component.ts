import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent implements OnInit {
  advertId: any;
  card: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService
  ) {}

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
    });
  }
}
