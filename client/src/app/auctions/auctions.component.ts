import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertismentService } from '../_services/advertisment.service';
import { AuctionService } from '../_services/auction.service';
import { CardService } from '../_services/card.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
})
export class AuctionsComponent implements OnInit {
  auctions: any = [];
  vehicles: any = [];
  currentPage: any = 1;
  numberOfAllCards: any;
  vehiclesSorted: any = [];

  pageId: any;
  sub: any;
  scrollUp: any;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private element: ElementRef,
    private imageService: ImageService,
    public auctionService: AuctionService
  ) {
    this.scrollUp = this.router.events.subscribe((path) => {
      element.nativeElement.scrollIntoView();
    });
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.vehicles = [];
      this.auctions = [];
      this.pageId = params.get('page');

      this.getNumberOfAllAuctions();
      this.getAuction();
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.scrollUp.unsubscribe();
  }

  getId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pageId = params.get('page');
    });
  }

  getNumberOfAllAuctions() {
    this.auctionService
      .getNumberOfAdvertisments()
      .subscribe((response) => (this.numberOfAllCards = response));
  }

  getAuction() {
    console.log(this.pageId + ' numery strony');

    this.http
      .get(
        'https://localhost:5001/api/auction/getAuctionsByPage/' + this.pageId
      )
      .subscribe(
        (response) => {
          this.auctions = response;

          for (var i = 0; i < this.auctions.length; i++) {
            this.getVehicles(this.auctions[i].vehicleId);
          }
        },
        (error) => this.toastr.error("Can't load adverts")
      );
  }

  getVehicles(id: number) {
    this.http
      .get('https://localhost:5001/api/vehicle/getVehicle/' + id)
      .subscribe((response) => {
        this.vehicles.push(response), this.sortVehicles();
      });
  }

  sortVehicles() {
    this.vehicles.sort((a, b) => a.vehicleId - b.vehicleId);
  }

  current() {
    let op = Number(this.pageId);

    return op;
  }

  addPageNumber() {
    if (this.pageId * 6 + 1 <= this.numberOfAllCards) {
      let p = Number(this.pageId) + 1;
      let ps = p.toString();
      this.router.navigateByUrl('/auc/' + ps);
    }
  }

  subPageNumber() {
    console.log(this.current());

    if (this.pageId - 1 > 0) {
      let p = Number(this.pageId) - 1;
      let ps = p.toString();
      this.router.navigateByUrl('/auc/' + ps);
    }
  }

  checkPreviousPage() {
    return this.pageId - 1 > 0 ? true : false;
  }
  checkNextPage() {
    return this.pageId * 6 + 1 <= this.numberOfAllCards ? true : false;
  }
}
