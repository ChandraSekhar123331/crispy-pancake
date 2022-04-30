import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWaiterComponent } from './assign-waiter.component';

describe('AssignWaiterComponent', () => {
  let component: AssignWaiterComponent;
  let fixture: ComponentFixture<AssignWaiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWaiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
