import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { AccountService } from '../_services/account.service';
import { AuctionService } from '../_services/auction.service';
import { OfferService } from '../_services/offer.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
})
export class MyOffersComponent implements OnInit {
  currentUser: any;
  highestOffers: any;
  max: number = 5;
  min: number = 0;
  auctionIdList: any = [];
  mappedIdList: any;
  auctions: any = [];
  public now: Date = new Date();
  constructor(
    private offerService: OfferService,
    private accountService: AccountService,
    private auctionService: AuctionService
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      (val) => (this.currentUser = val)
    );
    this.getHighestOffers();
  }

  getOffersDetails() {
    for (var i = 0; i < Object.keys(this.highestOffers).length; i++) {
      this.auctionService
        .getAuctionById(this.highestOffers[i].key)
        .subscribe((response) => {
          this.auctions.push(response);
          this.auctions.sort((a, b) => a.auctionId - b.auctionId);
          console.log(this.auctions);
        });
    }
  }

  getHighestOffers() {
    this.offerService
      .getHighestOffers(this.currentUser.userName)
      .subscribe((response) => {
        this.highestOffers = response;
        console.log(this.highestOffers);
        this.highestOffers.sort((a, b) => a.key - b.key);
        this.getOffersDetails();
      });
  }
  checkIfUserIsWinning(auction: any, i: number) {
    //console.log(auction.currentPrice + ' - ' + this.highestOffers[i].value);

    if (auction.currentPrice == this.highestOffers[i].value) {
      return true;
    } else {
      return false;
    }
  }
}
