import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
    role: new FormControl('', [Validators.required])
  });

  form2 = new FormGroup({
    attendantType: new FormControl('', [Validators.required]),
    chefSpecialization: new FormControl('', [Validators.required]),
    managerSkill: new FormControl('', [Validators.required])
  });

  roles = ['attendant', 'chef', 'manager'];
  attendantTypes = ['hotel', 'online'];
  managerSkills = ['db', 'trainee', 'attendant', 'head', 'chef', 'cleanliness', 'stock', 'hr'];

  showPassword = false;
  formStatus = 0;

  ngOnInit(): void {
  }

  formValid() {
    const field = {
      attendant: 'attendantType',
      chef: 'chefSpecialization',
      manager: 'managerSkill'
    }[this.registerForm.value.role as string] as string;
    return this.registerForm.valid && (this.form2.controls[field].valid);
  }

  onSubmit() {
    this.api.registerEmployee(Object.assign(this.registerForm.value, this.form2.value)).subscribe({
      next: (response: any) => {
        this.formStatus = 2;
        alert(`Please note:\n\nUsername: ${response.username}\nPassword: ${response.password}\n\nClick OK to copy to clipboard.`);
        setTimeout(() => { navigator.clipboard.writeText(`Username: ${response.username}\nPassword: ${response.password}`); }, 10);
        setTimeout(() => {
          this.formStatus = 0;
          this.registerForm.reset();
          this.form2.reset();
        }, 2500);
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
