import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AfterViewInit, ElementRef } from '@angular/core';

declare function setCar();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  visible = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  checkIfLogged() {
    let final = this.accountService.currentUser$;
    let status;
    final.subscribe((x) =>
      x != null ? this.router.navigateByUrl('/main') : console.log()
    );
  }

  
}
