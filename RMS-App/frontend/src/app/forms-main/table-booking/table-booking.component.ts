import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { increment, decrement } from '../../utility-functions';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss']
})
export class TableBookingComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  increment = increment;
  decrement = decrement;

  bookingForm = new FormGroup({
    floor: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9)]),
    datetime: new FormControl('', [Validators.required, this.validateDateTime]),
    size: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)])
  });

  formStatus = 0;

  bill_id?: number;

  counter = new Array(10);
  tables: [number, boolean][] = [[12, false], [11, true], [34, false], [56, true], [78, false], [90, true], [32, false], [17, true], [91, false], [44, true]];
  assignedTable?: number;

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

  ngOnInit(): void {
  }

  onUpdate() {
    this.api.getVacantTables(this.bookingForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: () => {
        // TODO
      }
    });
  }

  onSubmit() { }

}
