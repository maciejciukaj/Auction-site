import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AdvertismentService } from '../_services/advertisment.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-advertisments',
  templateUrl: './advertisments.component.html',
  styleUrls: ['./advertisments.component.scss'],
})
export class AdvertismentsComponent implements OnInit {
  advertisments: any = [];
  vehicles: any = [];
  currentPage: any = 1;
  numberOfAllCards: any;
  vehiclesSorted: any = [];

  pageId: any;
  sub: any;
  scrollUp: any;

  constructor(
    private http: HttpClient,
    private advertService: AdvertismentService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private element: ElementRef,
    private imageService: ImageService
  ) {
    this.scrollUp = this.router.events.subscribe((path) => {
      element.nativeElement.scrollIntoView();
    });
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.vehicles = [];
      this.advertisments = [];
      this.pageId = params.get('page');

      this.getNumberOfAllAdvertisments();
      this.getAdvertisments();
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

  getNumberOfAllAdvertisments() {
    this.advertService
      .getNumberOfAdvertisments()
      .subscribe((response) => (this.numberOfAllCards = response));
  }

  getAdvertisments() {
    console.log(this.pageId + ' numery strony');

    this.http
      .get('https://localhost:5001/api/card/getCardsByPage/' + this.pageId)
      .subscribe(
        (response) => {
          this.advertisments = response;

          for (var i = 0; i < this.advertisments.length; i++) {
            this.getVehicles(this.advertisments[i].advertismentId);
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

        /*  if (this.vehicles.length == 5) {
          this.sortVehicles();
        }*/
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
      this.router.navigateByUrl('/adv/' + ps);
    }
  }
  subPageNumber() {
    console.log(this.current());

    if (this.pageId - 1 > 0) {
      let p = Number(this.pageId) - 1;
      let ps = p.toString();
      this.router.navigateByUrl('/adv/' + ps);
    }
  }

  checkPreviousPage() {
    return this.pageId - 1 > 0 ?  true :  false;
  }
  checkNextPage() {
    return this.pageId * 6 + 1 <= this.numberOfAllCards ? true : false;
  }
}
