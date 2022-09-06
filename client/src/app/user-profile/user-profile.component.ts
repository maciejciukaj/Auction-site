import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

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

  constructor(public accountService: AccountService, private http: HttpClient) {
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
    //var myToken = JSON.parse(localStorage.getItem('user')).token;
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    // console.log(this.name.userName);

    this.http
      .get(this.baseUrl + 'user/getUsers/' + this.name.userName)
      .subscribe({
        next: (response) => (this.currentUser = response),
        error: (error) => console.log(error),
      });
  }

  ngOnInit(): void {}

  editToggle() {
    this.editMode = !this.editMode;
  }

  passwordToggle() {
    this.passwordMode = !this.passwordMode;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
  }
  cancelPasswordMode(event: boolean) {
    this.passwordMode = event;
  }
}
