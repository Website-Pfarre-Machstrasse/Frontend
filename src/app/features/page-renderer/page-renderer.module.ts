import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRendererRoutingModule } from './page-renderer-routing.module';
import { PageRendererComponent } from './page-renderer.component';
import {SharedModule} from '../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [PageRendererComponent],
    imports: [
      CommonModule,
      PageRendererRoutingModule,
      SharedModule,
      MatIconModule,
      MatButtonModule
    ]
})
export class PageRendererModule { }
