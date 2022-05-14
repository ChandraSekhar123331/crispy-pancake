import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  registerForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.]{3,}$')]),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl(''),
    terms: new FormControl('', [Validators.required, Validators.pattern('true')])
  });

  showPassword = false;
  formStatus = 0;

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.formStatus = 1;
      const data = JSON.parse(JSON.stringify(this.registerForm.value));
      delete data.terms;

      this.api.register(data).subscribe({
        next: () => {
          this.formStatus = 2;
          setTimeout(() => {
            this.router.navigate(['/login'], { replaceUrl: true });
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
