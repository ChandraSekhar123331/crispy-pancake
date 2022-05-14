import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { TakeOutComponent } from './take-out/take-out.component';
import { AssignWaiterComponent } from './assign-waiter/assign-waiter.component';
import { BillingComponent } from './billing/billing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { ViewsMainModule } from '../views-main/views-main.module';

@NgModule({
  declarations: [
    TableBookingComponent,
    TakeOutComponent,
    AssignWaiterComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewsMainModule,
    RouterModule.forChild([
      { path: 'table-booking', component: TableBookingComponent, canActivate: [AuthGuard], data: { roles: ['employee'] } },
      { path: 'take-out', component: TakeOutComponent, canActivate: [AuthGuard], data: { roles: ['customer'] } },
      { path: 'assign-waiter', component: AssignWaiterComponent, canActivate: [AuthGuard], data: { roles: ['employee'] } },
      { path: 'billing', component: BillingComponent, canActivate: [AuthGuard], data: { roles: ['employee'] } }
    ])
  ]
})
export class FormsMainModule { }
