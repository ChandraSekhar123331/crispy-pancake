import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private api: ApiService,
    private router: Router
  ) { }

  usingEmail = false;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.]{3,}$')]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  formStatus = 0;
  signingInAs = LoginType.PATRON;
  showPassword = false;

  ngOnInit(): void {
  }

  formValid(): boolean {
    return this.loginForm.controls['password'].valid && (this.usingEmail ? this.loginForm.controls['emailId'].valid : this.loginForm.controls['userName'].valid);
  }

  onSubmit(): void {
    if (this.formValid()) {
      this.formStatus = 1;
      const data = JSON.parse(JSON.stringify(this.loginForm.value));
      if (this.usingEmail) {
        delete data.userName;
      } else {
        delete data.emailId;
      }
      this.api.login(data, this.signingInAs).subscribe({
        next: (response) => {
          this.formStatus = 2;
          this.api.setUser(response);
          setTimeout(() => {
            this.router.navigate(['/'], { replaceUrl: true });
          }, 1500);
        },
        error: () => {
          this.formStatus = 3;
          setTimeout(() => {
            this.formStatus = 0;
          }, 2500);
        }
      });
    }
  }
}
