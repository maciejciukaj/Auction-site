import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss'],
})
export class UserInfoEditComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  constructor(
    private toastr: ToastrService,
    private http: HttpClientModule,
    private accountService: AccountService,
    private router: Router
  ) {}
  model: any = {};
  name: any;
  editForm = new FormGroup({
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

  keyPressNumber(event: any) {
    const phoneNumberPattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !phoneNumberPattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  cancel() {
    this.cancelEdit.emit(false);
  }

  editUserInfo() {
    if (
      this.editForm.get('firstname').valid ||
      this.editForm.get('lastname').valid ||
      this.editForm.get('email').valid ||
      this.editForm.get('phonenumber').valid
    ) {
      this.model = this.editForm.value;
      this.accountService.currentUser$.subscribe((val) => (this.name = val));
      this.model.username = this.name.userName;
      console.log(this.model);
      this.accountService.editUserInfo(this.model).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.log(error.error);

          this.toastr.error(error.error);
        }
      );
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
