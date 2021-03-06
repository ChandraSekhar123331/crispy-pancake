import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-take-out',
  templateUrl: './take-out.component.html',
  styleUrls: ['./take-out.component.scss']
})
export class TakeOutComponent implements OnInit {

  constructor() { }

  order: Map<number, [string, number, number]> = new Map();
  currentOrderForm = new FormGroup({
    dish_id: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });
  
  coFormStatus = 0;
  formStatus = 0;

  Array = Array;

  ngOnInit(): void {
    for (const [key, value] of this.order) {
      console.log(key, value);
    }
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
