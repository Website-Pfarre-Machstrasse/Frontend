import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../../shared/shared.module";
import { MatListModule } from "@angular/material/list";


@NgModule({
  declarations: [AdminComponent, MenuManagerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    DragDropModule,
    MatCardModule,
    SharedModule,
    MatListModule
  ]
})
export class AdminModule { }
