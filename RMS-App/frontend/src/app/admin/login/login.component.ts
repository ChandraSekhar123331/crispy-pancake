import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  formStatus = 0;
  showPassword = false;

  ngOnInit(): void {
  }

  onSubmit() { }

}
