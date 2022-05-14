import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService as EntryApi } from '../entry/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private entryApi: EntryApi
  ) { }

  baseUrl = 'http://localhost:3000/admin/';

  login(data: any) {
    return this.http.post(this.baseUrl + 'login', data, {
      withCredentials: true
    });
  }

  setUser = this.entryApi.setUser;
  getUser = this.entryApi.getUser;
  logout = this.entryApi.logout;
  verifyLogin = () => this.entryApi.verifyLogin(['admin']);
  loginNeeded = this.entryApi.loginNeeded;

  registerEmployee(data: any) {
    return this.http.post(this.baseUrl + 'register-employee', data, {
      withCredentials: true
    });
  }

  searchEmployee(username: string, status: 'f' | 't') {
    return this.http.get(this.baseUrl + 'search-employee/' + username + '/' + status, {
      withCredentials: true
    });
  }

  fireEmployee(username: string) {
    return this.http.post(this.baseUrl + 'fire-employee/' + username, {}, {
      withCredentials: true
    });
  }

}
