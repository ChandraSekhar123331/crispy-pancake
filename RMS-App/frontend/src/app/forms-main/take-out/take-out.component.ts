import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-take-out',
  templateUrl: './take-out.component.html',
  styleUrls: ['./take-out.component.scss']
})
export class TakeOutComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  order: Map<number, [string, number, number]> = new Map();
  currentOrderForm = new FormGroup({
    dish_id: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });

  coFormStatus = 0;
  formStatus = 0;

  billId?: number;

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

  onSubmit() {
    this.formStatus = 1;
    const order = [];
    for (const [key, value] of this.order) {
      order.push({
        dish_id: key,
        quantity: value[1]
      });
    }
    this.api.submitOrder(order).subscribe({
      next: (res: any) => {
        this.formStatus = 2;
        this.billId = res.billId;
        alert('Order completed. Please note the bill ID: ' + this.billId + '. Click OK to copy it to the clipboard.');
        setTimeout(() => { navigator.clipboard.writeText(this.billId!.toString()); }, 10);
      },
      error: (err: any) => {
        this.formStatus = 3;
        setTimeout(() => {
          this.formStatus = 0;
        }, 2500);
      }
    });
  }

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
