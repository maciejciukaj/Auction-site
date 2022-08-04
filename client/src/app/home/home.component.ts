import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

declare function setCar();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  setCarPos() {
    setCar();
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
