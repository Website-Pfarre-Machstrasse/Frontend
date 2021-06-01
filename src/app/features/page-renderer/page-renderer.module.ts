import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRendererRoutingModule } from './page-renderer-routing.module';
import { PageRendererComponent } from './page-renderer.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [PageRendererComponent],
    imports: [
      CommonModule,
      PageRendererRoutingModule,
      SharedModule
    ]
})
export class PageRendererModule { }
