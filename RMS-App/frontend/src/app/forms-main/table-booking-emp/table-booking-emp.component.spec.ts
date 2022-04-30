import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingEmpComponent } from './table-booking-emp.component';

describe('TableBookingEmpComponent', () => {
  let component: TableBookingEmpComponent;
  let fixture: ComponentFixture<TableBookingEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBookingEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBookingEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
