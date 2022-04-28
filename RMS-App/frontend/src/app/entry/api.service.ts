import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = '127.0.0.1:3000';

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/login`, credentials)
      .pipe(map(response => {
        if (response.user && response.token) {
          localStorage.setItem('crispy-pancake-current-user', JSON.stringify(response));
        }
        return response.user;
      }));
  }

  register(credentials: { email: string, firstName: string, lastName: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/register`, credentials)
      .pipe(map(response => {
        if (response.user && response.token) {
          localStorage.setItem('crispy-pancake-current-user', JSON.stringify(response));
        }
        return response.user;
      }));
  }

}
