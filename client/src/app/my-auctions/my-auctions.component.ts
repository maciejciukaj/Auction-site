import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.scss'],
})
export class MyAuctionsComponent implements OnInit {
  currentUser: any = {};
  posts: any = [];
  pages: any = [];
  max: number = 5;
  min: number = 0;
  capslockOn: boolean;
  constructor(
    private http: HttpClient,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.accountService.currentUser$.subscribe(
      (val) => (this.currentUser = val)
    );
    this.http
      .get(
        'https://localhost:5001/api/user/getUserPosts/' +
          this.currentUser.userName
      )
      .subscribe({
        next: (response) => {
          this.posts = response;

          this.getPages();
        },
        error: (error) => console.log(error),
      });
  }

  getPages() {
    var number = (this.posts.length % 5) + 1;
    for (var i = 1; i <= number; i++) {
      this.pages[i - 1] = i;
    }
    console.log(this.posts.length);
  }
  more() {
    console.log(this.max, this.min);
    if (this.posts.length > this.min + 5) {
      this.min = this.min + 5;
      this.max = this.max + 5;
    }
  }
  less() {
    console.log(this.max, this.min);
    if (this.min - 5 >= 0) {
      this.min = this.min - 5;
      this.max = this.max - 5;
    }
  }
}
