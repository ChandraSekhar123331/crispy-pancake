import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {

  constructor() { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
    role: new FormControl('', [Validators.required])
  });

  roles = ['chef', 'waiter', 'deliverer', 'cashier', 'manager'];

  showPassword = false;
  formStatus = 0;

  ngOnInit(): void {
  }

  onSubmit() { }

}
