import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestownerprofileComponent } from './restownerprofile.component';

describe('RestownerprofileComponent', () => {
  let component: RestownerprofileComponent;
  let fixture: ComponentFixture<RestownerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestownerprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestownerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
