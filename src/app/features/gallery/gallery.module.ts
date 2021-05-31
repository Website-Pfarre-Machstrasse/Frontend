import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent} from './gallery.component';
import { GalleryModule as _GalleryModule } from 'ng-gallery';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [GalleryComponent, DialogComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    _GalleryModule,
    LightboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    FormsModule
  ]
})
export class GalleryModule { }
