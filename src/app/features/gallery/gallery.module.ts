import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent} from './gallery.component';
import { GalleryModule as _GalleryModule } from 'ng-gallery';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LightboxModule} from 'ng-gallery/lightbox';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    _GalleryModule,
    LightboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ]
})
export class GalleryModule { }
