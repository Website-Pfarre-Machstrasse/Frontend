import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gallery as NgGallery, GalleryItem, ImageItem, VideoItem} from 'ng-gallery';
import {VideoItemData} from 'ng-gallery/lib/components/templates/items.model';
import {Lightbox} from 'ng-gallery/lightbox';
import {Observable} from 'rxjs';
import {Gallery, GalleryService, Media} from './gallery.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  get galleries$(): Observable<Gallery[]> {
    return this._galleryService.getGalleries();
  }

  constructor(private _gallery: NgGallery,
              private _lightbox: Lightbox,
              private _galleryService: GalleryService) {}

  ngOnInit(): void {
    let themeStyle = document.getElementById('themeStyle') as HTMLLinkElement;
    if (!themeStyle) {
      themeStyle = document.createElement('link');
    }
    themeStyle.href = 'gallery.css';
    themeStyle.rel = 'stylesheet';
    themeStyle.id = 'themeStyle';
    document.head.appendChild(themeStyle);
  }

  ngOnDestroy(): void {
    document.getElementById('themeStyle')?.remove();
  }

  parse(media: Media[]): GalleryItem[] {
    const out = [];
    for (const o of media) {
      const type = o.mimetype.split('/')[0];
      if (type === 'image') {
        out.push(new ImageItem({
          src: o._links.file,
          thumb: o._links.thumbnail,
          type: 'image'
        }));
      } else if (type === 'video') {
        out.push(new VideoItem({
          src: [{
            url: o._links.file,
            type: o.mimetype
          }],
          thumb: o._links.thumbnail,
          type: 'video',
          autoplay: false,
          controls: true
        } as VideoItemData));
      }
    }
    return out;
  }

  showGallery(id: string): void {
    this._galleryService.getGallery(id).subscribe(gallery => {
      this._gallery.ref(id).load(this.parse(gallery.media));
      this._lightbox.open(undefined, id);
    });
  }
}
