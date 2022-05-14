import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { AnalyticsComponent } from './analytics/analytics.component';

import { AdminGuard } from './admin.guard';
import { FireEmployeeComponent } from './fire-employee/fire-employee.component';

import { ViewsMainModule } from '../views-main/views-main.module';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeRegistrationComponent,
    AnalyticsComponent,
    FireEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewsMainModule,
    RouterModule.forChild([
      { path: 'admin/login', component: LoginComponent, canActivate: [AdminGuard] },
      { path: 'admin/employee-registration', component: EmployeeRegistrationComponent, canActivate: [AdminGuard] },
      { path: 'admin/analytics', component: AnalyticsComponent, canActivate: [AdminGuard] },
      { path: 'admin/fire-employee', component: FireEmployeeComponent, canActivate: [AdminGuard] }
    ])
  ]
})
export class AdminModule { }
