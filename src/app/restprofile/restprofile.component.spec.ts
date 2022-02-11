import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestprofileComponent } from './restprofile.component';

describe('RestprofileComponent', () => {
  let component: RestprofileComponent;
  let fixture: ComponentFixture<RestprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
