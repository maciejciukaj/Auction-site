import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

declare function setCar();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toastr.info('Use arrows to drive');
    setCar();
  }

  register() {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/main');
        this.cancel();
      },
      (error) => {
        console.log(error);

        this.toastr.error('Wrong username or password');
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.toastr.clear();
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/main');
      },
      (error) => {
        console.log(error);
        this.toastr.error('wrong username or password');
      }
    );
  }
}
