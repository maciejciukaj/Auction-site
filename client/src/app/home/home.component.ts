import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { isEmpty } from 'rxjs/operators';

declare function setCar();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfLogged();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  setCarPos() {
    setCar();
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
