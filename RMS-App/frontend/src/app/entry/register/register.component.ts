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
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}$')]),
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
    this.formStatus = 1;

    this.api.register(this.registerForm.value).subscribe({
      next: () => {
        this.formStatus = 2;
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.formStatus = 3;
        setTimeout(() => { this.formStatus = 0; }, 2000);
      }
    });
  }

}
