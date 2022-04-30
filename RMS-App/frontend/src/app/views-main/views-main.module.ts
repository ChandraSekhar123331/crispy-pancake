import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PrevOrdersComponent } from './prev-orders/prev-orders.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent,
    PrevOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'menu', component: MenuComponent },
      { path: 'prev-orders', component: PrevOrdersComponent }
    ])
  ]
})
export class ViewsMainModule { }
