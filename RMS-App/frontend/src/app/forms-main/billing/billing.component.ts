import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { increment, decrement } from 'src/app/utility-functions';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor() { }

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
  }

  onAdd() {
    const { dish_id, quantity } = this.currentOrderForm.value;
    if (this.order.has(dish_id)) {
      const ls = this.order.get(dish_id);
      ls![1] += quantity;
      this.order.set(dish_id, ls!);
    } else {
      this.order.set(dish_id, [`Dish ${dish_id}`, quantity, 17 + dish_id]);
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
