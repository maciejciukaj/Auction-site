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
          console.log(this.posts);
        },
        error: (error) => console.log(error),
      });
  }
}
