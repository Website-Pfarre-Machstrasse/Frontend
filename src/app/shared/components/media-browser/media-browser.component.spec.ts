import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBrowserComponent } from './media-browser.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaBrowserComponent', () => {
  let component: MediaBrowserComponent;
  let fixture: ComponentFixture<MediaBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      declarations: [ MediaBrowserComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {data: {title: 'Test'}}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
