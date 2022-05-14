import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-waiter',
  templateUrl: './assign-waiter.component.html',
  styleUrls: ['./assign-waiter.component.scss']
})
export class AssignWaiterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  bill_id?: number;
  customer_name?: string;

  waiters?: any;

  assignedWaiter?: number;

  formStatus = 0;

  ngOnInit(): void {
    const order = this.api.getOrder();
    this.bill_id = order.bill;
    this.customer_name = order.customer.full_name;

    this.api.getFreeWaiters().subscribe({
      next: (waiters) => {
        this.waiters = waiters;
      }
    });
  }

  onSubmit() {
    this.formStatus = 1;
    this.api.assignWaiter(this.waiters![this.assignedWaiter!]!.emp_id, this.bill_id!).subscribe({
      next: (response) => {
        alert('Order complete. The waiter will take over shortly.');
        localStorage.removeItem('order');
        this.router.navigate(['/table-booking']);
      }
    });
  }

}
