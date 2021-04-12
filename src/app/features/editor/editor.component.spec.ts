import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggingModule} from '../../core/logging/logging.module';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, LoggingModule.forRoot(), CodemirrorModule, HttpClientTestingModule ],
      declarations: [ EditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
