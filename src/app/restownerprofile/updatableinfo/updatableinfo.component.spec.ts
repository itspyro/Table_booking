import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatableinfoComponent } from './updatableinfo.component';

describe('UpdatableinfoComponent', () => {
  let component: UpdatableinfoComponent;
  let fixture: ComponentFixture<UpdatableinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatableinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatableinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
