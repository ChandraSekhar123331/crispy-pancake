import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}$')]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    terms: new FormControl('', [Validators.required, Validators.pattern('true')])
  });

  showPassword = false;
  formStatus = 0;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formStatus = 1;

    this.api.register(this.registerForm.value).subscribe({
      error: (err) => {
        console.error(err);
        this.formStatus = 3;
        this.registerForm.reset();
      }
    });
  }

}
