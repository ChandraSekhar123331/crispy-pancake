import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'employee-registration', component: EmployeeRegistrationComponent }
    ])
  ]
})
export class AdminModule { }
