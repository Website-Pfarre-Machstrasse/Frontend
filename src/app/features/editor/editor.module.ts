import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {SharedModule} from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [EditorComponent],
    imports: [
        CommonModule,
        EditorRoutingModule,
        CodemirrorModule,
        SharedModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EditorModule { }
