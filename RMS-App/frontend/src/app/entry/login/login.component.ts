import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

enum LoginType {
  PATRON,
  EMPLOYEE
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  formStatus = 0;
  signingInAs = LoginType.PATRON;
  showPassword = false;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formStatus = 1;

    this.api.login(this.loginForm.value, ['customer', 'employee'][this.signingInAs]).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response.result));
        this.formStatus = 2;
      },
      error: (err) => {
        console.error(err);
        this.formStatus = 3;
        setTimeout(() => { this.formStatus = 0; }, 2000);
      }
    });
  }

}
