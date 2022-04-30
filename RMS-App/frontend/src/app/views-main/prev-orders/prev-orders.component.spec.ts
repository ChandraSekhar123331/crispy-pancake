import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevOrdersComponent } from './prev-orders.component';

describe('PrevOrdersComponent', () => {
  let component: PrevOrdersComponent;
  let fixture: ComponentFixture<PrevOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
