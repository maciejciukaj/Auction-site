import { LabelType, Options } from '@angular-slider/ngx-slider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import {
  BrandClass,
  ColorClass,
  FuelClass,
  TypeClass,
} from '../_models/vehicle';
import { AdvertismentService } from '../_services/advertisment.service';
import { CardService } from '../_services/card.service';
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
  types = new TypeClass();
  brands = new BrandClass();
  colors = new ColorClass();
  fuel = new FuelClass();
  filter: any = [];
  minValuePrice: number = 100;
  maxValuePrice: number = 500000;
  minValueYear: number = 1960;
  maxValueYear: number = 2023;
  optionsPrice: Options = {
    floor: 100,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };
  optionsYear: Options = {
    floor: 1960,
    ceil: 2023,
  };

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
    private imageService: ImageService,
    public cardService: CardService,
    private route: ActivatedRoute,
    private _router: Router
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
    var data = {
      minPrice: this.minValuePrice,
      maxPrice: this.maxValuePrice,
    };

    var config = {
      params: data,
      headers: { Accept: 'application/json' },
    };
    this.advertService
      .getNumberOfAdvertisments(config)
      .subscribe((response) => {
        (this.numberOfAllCards = response), console.log(this.numberOfAllCards);
      });
  }

  getAdvertisments() {
    var data = {
      minPrice: this.minValuePrice,
      maxPrice: this.maxValuePrice,
    };

    var config = {
      params: data,
      headers: { Accept: 'application/json' },
    };
    console.log(this.pageId + ' numery strony');
    console.log(config);

    this.http
      .get(
        'https://localhost:5001/api/card/getCardsByPage/' + this.pageId,
        config
      )
      .subscribe(
        (response) => {
          this.advertisments = response;
          console.log(this.advertisments.length + ' adv length');

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
        console.log(response);

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
    return this.pageId - 1 > 0 ? true : false;
  }
  checkNextPage() {
    return this.pageId * 6 <= this.advertisments.length ? true : false;
  }
  expand() {
    var coll = document.getElementsByClassName('collapsible');
    var i;

    for (i = 0; i < coll.length; i++) {
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

  filterCars() {
    this.vehicles = [];
    this.advertisments = [];
    this.getNumberOfAllAdvertisments();
    this.getAdvertisments();
  }

  getFiltered() {
    var data = {
      type: this.filter.type ?? '',
      brand: this.filter.brand ?? '',
      fuel: this.filter.fuel ?? '',
      color: this.filter.color ?? '',
      minYear: this.minValueYear,
      maxYear: this.maxValueYear,
    };

    var config = {
      params: data,
      headers: { Accept: 'application/json' },
    };
    console.log(data);

    this.http
      .get('https://localhost:5001/api/vehicle/getFilteredVehicles', config)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
