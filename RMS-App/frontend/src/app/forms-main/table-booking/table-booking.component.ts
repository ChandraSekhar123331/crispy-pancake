import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { increment, decrement } from '../../utility-functions';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss']
})
export class TableBookingComponent implements OnInit {

  constructor() { }

  increment = increment;
  decrement = decrement;

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

}
