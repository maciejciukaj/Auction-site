import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  capslockOn: boolean;
  reset: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getToken();
    this.reset.token = this.token;
    console.log(this.token);
  }
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }

  getToken() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.token = params.get('token');
    });
  }

  resetPassword() {
    console.log(this.reset);

    this.accountService.resetPassword(this.reset).subscribe(() => {
      this.toastr.success('Password changed');
      this.router.navigateByUrl('/');
    });
  }
}
