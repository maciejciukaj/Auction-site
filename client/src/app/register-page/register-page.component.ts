import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  model: any = {};
  capslockOn: boolean;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    username: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(
        '^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
      ),
    ]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern(
        '^(?=.{6,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
      ),
    ]),
    firstname: new FormControl(null, [
      Validators.minLength(2),
      Validators.maxLength(35),
      Validators.pattern("^([ \u00c0-\u01ffa-zA-Z'-])+$"),
    ]),
    lastname: new FormControl(null, [
      Validators.minLength(2),
      Validators.maxLength(35),
      Validators.pattern("^([ \u00c0-\u01ffa-zA-Z'-])+$"),
    ]),
    email: new FormControl(null, [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.minLength(4),
      Validators.maxLength(35),
    ]),
    phonenumber: new FormControl(null, [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(9),
      Validators.maxLength(12),
    ]),
  });

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      this.model = this.registerForm.value;
      this.accountService.register(this.model).subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/main');
        },
        (error) => {
          console.log(error);

          this.toastr.error(error.error);
        }
      );
    } else {
      this.toastr.error('Correct the entered data');
    }
  }
  keyPressNumber(event: any) {
    const phoneNumberPattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !phoneNumberPattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockOn = true;
    } else {
      this.capslockOn = false;
    }
  }
  get f() {
    return this.registerForm.controls;
  }
}
