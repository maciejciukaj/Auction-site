import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  @Input() photos = [];
  @Input() addedPhotos = [];
  constructor() {}

  ngOnInit(): void {}

  cancel() {
    this.cancelEdit.emit(false);
  }

  deleteImage(nr: any) {
    console.log(nr);
    this.photos.splice(nr, 1);
    this.addedPhotos.splice(nr, 1);
  }
  replaceImages(nr: any) {
    let temp: any;
    temp = this.photos[0];
    this.photos[0] = this.photos[nr];
    this.photos[nr] = temp;

    temp = this.addedPhotos[0];
    this.addedPhotos[0] = this.addedPhotos[nr];
    this.addedPhotos[nr] = temp;
  }
}
