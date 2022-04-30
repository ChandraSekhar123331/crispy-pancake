import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-waiter',
  templateUrl: './assign-waiter.component.html',
  styleUrls: ['./assign-waiter.component.scss']
})
export class AssignWaiterComponent implements OnInit {

  constructor() { }

  bill_id = 2389;

  waiters = [
    { id: 1, name: 'John Doe', experience: 10, rating: 4.5 },
    { id: 2, name: 'Jane Doe', experience: 8, rating: 4.2 },
    { id: 3, name: 'Jack Doe', experience: 6, rating: 3.9 },
    { id: 4, name: 'Jill Doe', experience: 4, rating: 3.6 },
    { id: 5, name: 'Joe Doe', experience: 2, rating: 3.3 },
    { id: 6, name: 'Jenny Doe', experience: 0, rating: 3.0 },
  ];

  assignedWaiter?: number;

  ngOnInit(): void {
  }

}
