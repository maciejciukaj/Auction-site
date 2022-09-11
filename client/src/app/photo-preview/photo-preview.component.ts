import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  @Input() photos = [];
  constructor() {}

  ngOnInit(): void {}

  cancel() {
    this.cancelEdit.emit(false);
    
  }

  show() {}
}
