import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

declare function next(): any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  email: any = {};
  resetMode: boolean = false;
  capslockOn: boolean;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/main');
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  @HostListener('window:click', ['$event']) onClick(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  showEmail() {
    console.log(this.email);
  }

  toggleReset() {
    this.resetMode = !this.resetMode;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
}
