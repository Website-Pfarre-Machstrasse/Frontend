import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRendererComponent } from './page-renderer.component';

const routes: Routes = [{ path: '', component: PageRendererComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRendererRoutingModule { }
