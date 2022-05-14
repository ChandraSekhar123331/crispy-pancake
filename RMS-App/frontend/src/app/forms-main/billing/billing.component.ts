import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ApiService as EntryApi } from 'src/app/entry/api.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(
    private api: ApiService,
    private entryApi: EntryApi,
    private router: Router
  ) { }

  bill_id?: number;
  table_id?: number;
  customer_name?: string; // TODO

  order: Map<number, [string, number, number]> = new Map();
  currentOrderForm = new FormGroup({
    dish_id: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });

  customerInfoForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required])
  });

  usingEmail = false;
  registered = true;

  ciFormStatus = 0;
  coFormStatus = 0;
  formStatus = 0;

  userId?: number;
  name?: string;
  identified = false;

  Array = Array;

  ngOnInit(): void {
    this.api.getActiveBill(this.entryApi.getUser().emp_id).subscribe({
      next: (data: any) => {
        if (data) {
          this.bill_id = data.bill_id;
          this.table_id = data.table_id;
          this.customer_name = data.full_name;
        } else {
          alert('No active bill exists.');
          this.router.navigate(['/']);
        }
      }
    });
  }

  onAdd() {
    const { dish_id, quantity } = this.currentOrderForm.value;
    if (this.order.has(dish_id)) {
      const ls = this.order.get(dish_id);
      ls![1] += quantity;
      this.order.set(dish_id, ls!);
    } else {
      this.coFormStatus = 1;
      this.api.getDishInfo(dish_id).subscribe({
        next: (res: any) => {
          if (res) {
            this.order.set(dish_id, [res.dish_name, quantity, res.dish_price]);
          } else {
            alert('No dish exists with the given ID.');
          }
          this.coFormStatus = 0;
        },
        error: (err: any) => {
          alert(`Error encountered: ${err.message}`);
        }
      });
    }
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

  totalPrice() {
    let total = 0;
    for (const [_, value] of this.order) {
      total += value[1] * value[2];
    }
    return total;
  }

  removeItem(key: number) {
    this.order.delete(key);
  }

}
