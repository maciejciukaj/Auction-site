import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {
  BrandClass,
  ColorClass,
  FuelClass,
  TypeClass,
} from '../_models/vehicle';

@Component({
  selector: 'app-filter-element',
  templateUrl: './filter-element.component.html',
  styleUrls: ['./filter-element.component.scss'],
})
export class FilterElementComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  types = new TypeClass();
  brands = new BrandClass();
  colors = new ColorClass();
  fuel = new FuelClass();
  filter: any = [];
  config: any = [];
  minValuePrice: number = 0;
  maxValuePrice: number = 500000;
  minValueYear: number = 1960;
  maxValueYear: number = 2023;
  optionsPrice: Options = {
    floor: 0,
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
  constructor() {}

  ngOnInit(): void {
    this.brands.brandList.sort();
    this.colors.colorList.sort();
    var data = {
      type: this.filter.type ?? '',
      brand: this.filter.brand ?? '',
      fuel: this.filter.fuel ?? '',
      color: this.filter.color ?? '',
      minYear: this.minValueYear,
      maxYear: this.maxValueYear,
      minPrice: this.minValuePrice,
      maxPrice: this.maxValuePrice,
    };

    this.config = {
      params: data,
      headers: { Accept: 'application/json' },
    };
    this.filterData();
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
  filterData() {
    var data = {
      type: this.filter.type ?? '',
      brand: this.filter.brand ?? '',
      fuel: this.filter.fuel ?? '',
      color: this.filter.color ?? '',
      minYear: this.minValueYear,
      maxYear: this.maxValueYear,
      minPrice: this.minValuePrice,
      maxPrice: this.maxValuePrice,
    };

    this.config = {
      params: data,
      headers: { Accept: 'application/json' },
    };
    console.log(this.config);
    this.newItemEvent.emit(this.config);
  }
}
