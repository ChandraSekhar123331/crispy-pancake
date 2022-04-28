import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TakeOutComponent } from './take-out/take-out.component';

@NgModule({
  declarations: [
    TableBookingComponent,
    TakeOutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'table-booking', component: TableBookingComponent },
      { path: 'take-out', component: TakeOutComponent }
    ])
  ]
})
export class FormsMainModule { }
