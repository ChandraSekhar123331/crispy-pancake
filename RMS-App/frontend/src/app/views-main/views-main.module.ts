import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    PastOrdersComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['customer', 'employee'] } },
      { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], data: { roles: ['customer', 'employee'] } },
      { path: 'past-orders', component: PastOrdersComponent, canActivate: [AuthGuard], data: { roles: ['customer'] } }
    ])
  ],
  exports: [
    NavbarComponent
  ]
})
export class ViewsMainModule { }
