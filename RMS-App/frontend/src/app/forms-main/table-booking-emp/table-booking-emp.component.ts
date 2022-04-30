import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { increment, decrement } from '../../utility-functions';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-table-booking-emp',
  templateUrl: './table-booking-emp.component.html',
  styleUrls: ['./table-booking-emp.component.scss']
})
export class TableBookingEmpComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

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

  user = this.api.getUserInfo();
  name?: string;
  identified = false;

  usingEmail = false;
  registered = true;

  checkStatus = 0;
  formStatus = 0;

  counter = new Array(10);
  tables?: [{ table_id: number }];
  assignedTable?: number;

  ngOnInit(): void {
  }

  async onCheck() {
    if (this.registered) {
      // this.userId = 2378;
      this.name = "John Doe";
    } else {
      this.name = this.customerInfoForm.value.name;
    }
    this.identified = true;
  }

  onUpdate() {
    this.checkStatus = 1;
    this.api.getVacantTables(this.bookingForm.value).subscribe({
      next: (response) => {
        this.tables = response.result;
        this.checkStatus = 0;
        this.assignedTable = undefined;
      },
      error: () => {
        // TODO
      }
    });
  }

  onSubmit() {
    console.log(this.customerInfoForm.value);
    this.formStatus = 1;
    this.api.bookTable({
      customerId: this.user.id,
      tableList: this.assignedTable!,
      startTime: new Date().toISOString(),
    }).subscribe({
      next: (response) => {
        this.formStatus = 0;
        console.log(response);
      }
    });
  }

}
