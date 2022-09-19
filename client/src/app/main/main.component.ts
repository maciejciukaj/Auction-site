import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public router: Router, private service: ImageService) {}

  ngOnInit(): void {
    this.service.getImageDetailList();
  }
}
