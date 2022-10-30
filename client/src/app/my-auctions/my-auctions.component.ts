import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { CardService } from '../_services/card.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.scss'],
})
export class MyAuctionsComponent implements OnInit {
  currentUser: any = {};
  posts: any = [];
  auctions: any = [];
  pages: any = [];
  max: number = 5;
  min: number = 0;
  photosPosts: any = [];
  photosAuctions: any = [];
  scrollUp: any;
  capslockOn: boolean;
  isAuction: boolean;

  constructor(
    private http: HttpClient,
    public accountService: AccountService,
    private imageService: ImageService,
    public cardService: CardService,
    private router: Router,
    private element: ElementRef
  ) {
    this.scrollUp = this.router.events.subscribe((path) => {
      element.nativeElement.scrollIntoView();
    });
  }

  ngOnInit(): void {
    this.getPosts();
    this.getAuctions();
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
          this.posts.sort((a, b) => a.advertismentId - b.advertismentId);
          this.getMainPhotos(this.posts, false);
          this.getPages(this.posts);
        },
        error: (error) => console.log(error),
      });
  }

  getAuctions() {
    this.accountService.currentUser$.subscribe(
      (val) => (this.currentUser = val)
    );
    this.http
      .get(
        'https://localhost:5001/api/user/getUserAuctions/' +
          this.currentUser.userName
      )
      .subscribe({
        next: (response) => {
          this.auctions = response;
          console.log(this.auctions);
          this.auctions.sort((a, b) => a.auctionId - b.auctionId);
          this.getMainPhotos(this.auctions, true);
          this.getPages(this.auctions);
        },
        error: (error) => console.log(error),
      });
  }

  getPages(list: any) {
    var number = (list.length % 5) + 1;
    for (var i = 1; i <= number; i++) {
      this.pages[i - 1] = i;
    }
  }

  getMainPhotos(postList: any, isAuction: boolean) {
    for (var post of postList) {
      this.imageService
        .getPhotoByVehicleId(post.vehicleId)
        .subscribe((response) => {
          var photo: any = response;
          isAuction
            ? this.photosAuctions.push(response)
            : this.photosPosts.push(response);
          this.sortPhotos();
        });
    }

    console.log(this.photosPosts);
  }
  sortPhotos() {
    this.photosPosts.sort((a, b) => a.photoId - b.photoId);
    this.photosAuctions.sort((a, b) => a.photoId - b.photoId);
  }

  more(list: any) {
    if (list.length > this.min + 5) {
      this.min = this.min + 5;
      this.max = this.max + 5;
    }
  }
  less() {
    if (this.min - 5 >= 0) {
      this.min = this.min - 5;
      this.max = this.max - 5;
    }
  }

  toggleAuction() {
    this.isAuction = !this.isAuction;
    console.log(this.auctions);

    this.min = 0;
    this.max = 5;
  }
}
