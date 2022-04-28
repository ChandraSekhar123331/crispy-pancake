import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss']
})
export class TableBookingComponent implements OnInit {

  constructor() { }

  bookingForm = new FormGroup({
    datetime: new FormControl('', [Validators.required, this.validateDateTime]),
    size: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)])
  });

  validateDateTime(control: FormControl) {
    const value = control.value;
    if (value) {
      const date = new Date(value);
      const now = new Date();
      if (date < now) {
        return { validateDateTime: false };
      }
    }
    return null;
  }

  formStatus = 0;

  ngOnInit(): void {
  }

  onSubmit() { }

  increment(property: string, max: number) {
    const value = this.bookingForm.get(property)!.value;
    if (value < max) {
      this.bookingForm.get(property)!.setValue(value + 1);
    }
  }

  decrement(property: string, min: number) {
    const value = this.bookingForm.get(property)!.value;
    if (value > min) {
      this.bookingForm.get(property)!.setValue(value - 1);
    }
  }

}
