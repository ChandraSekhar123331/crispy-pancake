import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { increment, decrement } from 'src/app/utility-functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss']
})
export class TableBookingComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
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

  customer?: any;
  identified = false;

  usingEmail = false;
  registered = true;

  checkStatus = 0;
  updateStatus = 0;
  formStatus = 0;

  counter = new Array(10);
  tables?: [{ table_id: number, occupancy: number }];
  assignedTable?: number;

  ngOnInit(): void {
  }

  async onCheck() {
    if (this.registered) {
      this.checkStatus = 1;
      this.api.getCustomerInfo(this.customerInfoForm.value.username).subscribe({
        next: (response: any) => {
          if (response) {
            this.checkStatus = 2;
            this.customer = response;
          } else {
            alert("There exists no customer with this username.");
            this.identified = false;
            this.checkStatus = 0;
          }
        }
      });
    } else {
      this.customer = {
        name: this.customerInfoForm.value.name
      }
      this.identified = true;
    }
  }

  isRegistered() {
    return this.customer.username !== undefined && this.customer.username !== '';
  }

  onUpdate() {
    this.updateStatus = 1;
    this.api.getVacantTables(this.bookingForm.value).subscribe({
      next: (response: any) => {
        this.tables = response;
        this.updateStatus = 0;
        this.assignedTable = undefined;
      }
    });
  }

  onSubmit() {
    this.formStatus = 1;
    this.api.bookTable({
      customer_id: this.customer.customer_id,
      table_id: this.assignedTable,
    }).subscribe({
      next: (response: any) => {
        this.formStatus = 2;
        this.api.saveOrder({
          customer: this.customer,
          bill: response.billId
        });
        this.router.navigate(['/assign-waiter']);
      }
    });
  }

}
