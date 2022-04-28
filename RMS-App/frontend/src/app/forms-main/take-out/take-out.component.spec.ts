import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOutComponent } from './take-out.component';

describe('TakeOutComponent', () => {
  let component: TakeOutComponent;
  let fixture: ComponentFixture<TakeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
