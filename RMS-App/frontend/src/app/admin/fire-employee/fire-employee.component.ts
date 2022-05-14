import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-fire-employee',
  templateUrl: './fire-employee.component.html',
  styleUrls: ['./fire-employee.component.scss']
})
export class FireEmployeeComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.]{3,}$')]),
    confirmation: new FormControl('', [Validators.required, Validators.pattern('^true$')])
  });

  employee?: any;

  f1Status = 0;
  formStatus = 0;
  found = false;

  ngOnInit(): void {
  }

  onSearch() {
    this.api.searchEmployee(this.formGroup.value.username, 'f').subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.employee = data;
          this.found = true;
        } else {
          alert(`No active employee with username ${this.formGroup.value.username} found.`);
        }
      }
    );
  }

  onSubmit() {
    this.formStatus = 1;
    this.api.fireEmployee(this.formGroup.value.username).subscribe(
      (data: any) => {
        if (data) {
          this.formStatus = 2;
        } else {
          this.formStatus = 3;
          setTimeout(() => {
            this.formStatus = 0;
          }, 2500);
        }
      });
  }

}
