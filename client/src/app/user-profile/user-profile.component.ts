import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { PasswordScheme } from '../_models/passwordScheme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public now: Date = new Date();
  public welcome: string;
  baseUrl = 'https://localhost:5001/api/';
  currentUser: any;
  name: any;
  editMode = false;
  passwordMode = false;

  newUserPassword: any = {};

  constructor(
    public accountService: AccountService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.getUser();
    this.now = new Date();
    if (this.now.getHours() > 5 && this.now.getHours() < 12) {
      this.welcome = '☀️ Good Morning';
    } else if (this.now.getHours() >= 12 && this.now.getHours() < 18) {
      this.welcome = '🌞 Good Afternoon';
    } else {
      this.welcome = '🌜 Good Evening';
    }
  }

  getUser() {
    //var myToken = JSON.parse(localStorage.getItem('user')).token;;
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    // console.log(this.name.userName);

    this.http
      .get(this.baseUrl + 'user/getUsers/' + this.name.userName)
      .subscribe({
        next: (response) => (this.currentUser = response),
        error: (error) => console.log(error),
      });
  }

  changePassword(form: NgForm) {
    this.newUserPassword.username = this.name.userName;
    console.log(this.newUserPassword);
    this.accountService.changePassword(this.newUserPassword).subscribe({
      next: (response) => (
        this.toastr.success('Password changed'),
        this.editPasswordMode(),
        form.reset()
      ),
      error: (error) => this.toastr.error(error.error),
    });
  }

  ngOnInit(): void {}

  editToggle() {
    this.passwordMode = false;
    this.editMode = !this.editMode;
  }

  editPasswordMode() {
    this.passwordMode = !this.passwordMode;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
  }
}
