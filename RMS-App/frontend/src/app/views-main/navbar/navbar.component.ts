import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/entry/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.api.logout();
  }

}
