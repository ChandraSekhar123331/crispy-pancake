import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TakeOutComponent } from './take-out/take-out.component';
import { BillingComponent } from './billing/billing.component';
import { AssignWaiterComponent } from './assign-waiter/assign-waiter.component';
import { TableBookingEmpComponent } from './table-booking-emp/table-booking-emp.component';

@NgModule({
  declarations: [
    TableBookingComponent,
    TakeOutComponent,
    BillingComponent,
    AssignWaiterComponent,
    TableBookingEmpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'table-booking', component: TableBookingEmpComponent },
      { path: 'take-out', component: TakeOutComponent },
      { path: 'billing/:id', component: BillingComponent },
      { path: 'assign-waiter/:id', component: AssignWaiterComponent }
    ])
  ]
})
export class FormsMainModule { }
