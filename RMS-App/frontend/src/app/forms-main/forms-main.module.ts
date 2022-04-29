import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TakeOutComponent } from './take-out/take-out.component';
import { BillingComponent } from './billing/billing.component';

@NgModule({
  declarations: [
    TableBookingComponent,
    TakeOutComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'table-booking', component: TableBookingComponent },
      { path: 'take-out', component: TakeOutComponent },
      { path: 'billing', component: BillingComponent }
    ])
  ]
})
export class FormsMainModule { }
