import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { GalleryComponent} from './gallery.component';

const routes: Routes = [{ path: '', component: GalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
