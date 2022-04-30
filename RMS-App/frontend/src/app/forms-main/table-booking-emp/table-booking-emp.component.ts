import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { increment, decrement } from '../../utility-functions';

@Component({
  selector: 'app-table-booking-emp',
  templateUrl: './table-booking-emp.component.html',
  styleUrls: ['./table-booking-emp.component.scss']
})
export class TableBookingEmpComponent implements OnInit {

  constructor() { }

  increment = increment;
  decrement = decrement;

  bookingForm = new FormGroup({
    floor: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9)]),
    size: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)])
  });

  customerInfoForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required])
  });

  userId?: number;
  name?: string;
  identified = false;

  usingEmail = false;
  registered = true;

  checkStatus = 0;
  formStatus = 0;

  counter = new Array(10);
  tables: [number, boolean][] = [[12, false], [11, true], [34, false], [56, true], [78, false], [90, true], [32, false], [17, true], [91, false], [44, true]];
  assignedTable?: number;

  ngOnInit(): void {
  }

  async onCheck() {
    if (this.registered) {
      this.userId = 2378;
      this.name = "John Doe";
    } else {
      this.name = this.customerInfoForm.value.name;
    }
    this.identified = true;
  }

  onSubmit() { }

}
