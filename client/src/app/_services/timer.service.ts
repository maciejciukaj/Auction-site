import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  format: string = 'MM/dd/yyyy HH:mm:ss';
  locale: string = 'en-US';
  now: Date;
  nowDate: string;
  constructor() {
    this.nowDate = this.getTime(new Date());
  }

  getTime(date) {
    return formatDate(date, this.format, this.locale);
  }

  transform(miliseconds: number) {
    var cd = 24 * 60 * 60,
      ch = 60 * 60,
      day = Math.floor(miliseconds / cd),
      hr = Math.floor((miliseconds - day * cd) / ch),
      min = Math.round((miliseconds - day * cd - hr * ch) / 60);

    if (min === 60) {
      hr++;
      min = 0;
    }
    if (hr === 24) {
      day++;
      min = 0;
    }

    var valStr = day != 0 ? day + ' day(s) ' : '';
    valStr += hr != 0 ? hr + ' hr ' : '';
    valStr += min != 0 ? min + ' min ' : '';
    return valStr;
  }

  differenceBetweenDates(date2) {
    this.nowDate = this.getTime(new Date());
    var diff: any;
    diff = new Date(date2).getTime() - new Date(this.nowDate).getTime();
    return this.transform(diff / 1000);
  }

  getSeconds(date2) {
    this.nowDate = this.getTime(new Date());
    var diff: any;
    diff = new Date(date2).getTime() - new Date(this.nowDate).getTime();
    //console.log(diff / 1000);

    return diff / 1000;
  }
}
