import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {SharedModule} from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomepageRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HomepageModule { }
