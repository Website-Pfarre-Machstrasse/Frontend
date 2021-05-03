import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRendererComponent } from './page-renderer.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggingModule} from '../../core/logging/logging.module';

describe('PageRendererComponent', () => {
  let component: PageRendererComponent;
  let fixture: ComponentFixture<PageRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, LoggingModule.forRoot() ],
      declarations: [ PageRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
