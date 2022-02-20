import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestOverviewComponent } from './rest-overview.component';

describe('RestOverviewComponent', () => {
  let component: RestOverviewComponent;
  let fixture: ComponentFixture<RestOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
