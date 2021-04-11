//import { Component, OnInit } from '@angular/core';
//import {Gallery, GalleryConfig, GalleryItem, ImageItem} from 'ng-gallery';

import {Component, OnInit, ViewChild} from '@angular/core';
import {Gallery, GalleryItem, ImageItem} from 'ng-gallery';



@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  // template: '<gallery [items]="images"></gallery>'
})


export class GalleryComponent implements OnInit {
  images: GalleryItem[];
  //options: Gallery;

  ngOnInit(): void {
    // Set gallery items array

    this.images = [
      new ImageItem({src: 'assets/img01.jpg', thumb: 'assets/img01.jpg'}),
      new ImageItem({src: 'assets/img02.jpg', thumb: 'assets/img02.jpg'}),
      new ImageItem({src: 'assets/img03.jpg', thumb: 'assets/img03.jpg'}),
      new ImageItem({src: 'assets/img04.jpg', thumb: 'assets/img04.jpg'}),
      new ImageItem({src: 'assets/img05.jpg', thumb: 'assets/img05.jpg'}),
      new ImageItem({src: 'assets/img06.jpg', thumb: 'assets/img06.jpg'})
    ];
    document.getElementById('gallery01').style.display = 'none';
    document.getElementById('gallery02').style.display = 'none';
    document.getElementById('gallery03').style.display = 'none';
    document.getElementById('zurueck').style.display = 'none';

  }

  showGallery(index): void {
    document.getElementById('list').style.display = 'none';
    switch(index) {
      case 1:
        document.getElementById('gallery01').style.display = 'block';
        break;
      case 2:
        document.getElementById('gallery02').style.display = 'block';
        break;
      case 3:
        document.getElementById('gallery03').style.display = 'block';
        break;
    }
    document.getElementById('zurueck').style.display = 'block';
  }

  hideGallery(): void {
    console.log("hello");
    document.getElementById('gallery01').style.display = 'none';
    document.getElementById('gallery02').style.display = 'none';
    document.getElementById('gallery03').style.display = 'none';
    document.getElementById('zurueck').style.display = 'none';
    document.getElementById('list').style.display = 'inline';
  }
}








// export class GalleryComponent implements OnInit {
//   GalleryComponent private gallery;
//   ngOnInit(): void {
//     this.gallery.addImage(new ImageItem({src: 'assets/img01.jpg', thumb: 'assets/img01.jpg'}));
//     this.gallery.addImage(new ImageItem({src: 'assets/img02.jpg', thumb: 'assets/img02.jpg'}));
//     this.gallery.addImage(new ImageItem({src: 'assets/img03.jpg', thumb: 'assets/img03.jpg'}));
//     this.gallery.addImage(new ImageItem({src: 'assets/img04.jpg', thumb: 'assets/img04.jpg'}));
//     this.gallery.addImage(new ImageItem({src: 'assets/img05.jpg', thumb: 'assets/img05.jpg'}));
//     this.gallery.addImage(new ImageItem({src: 'assets/img06.jpg', thumb: 'assets/img06.jpg'}));
//   }
// }

/*import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { VERSION } from '@angular/material';
import { Gallery, GalleryItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  // template: '<gallery [items]="images"></gallery>'
})
export class GalleryComponent implements OnInit {

  items: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {

  }

  ngOnInit(): void {
    // Note that src is not defined, instead we have observable

    this.items = this.imageData.map(item =>
      new CustomItem()
    );
  }
}

export class CustomItem implements GalleryItem {

  readonly type = 'custom-item';
  readonly data: any;

  constructor() {
    this.data = data;
  }
}

const data = [
  {
    srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
  }
];*/
