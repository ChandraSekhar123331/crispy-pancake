import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  baseUrl = 'http://localhost:3000/entry/';

  register({ emailId, userName, fullName, password, phoneNumber, address }: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register', { emailId, userName, fullName, password, phoneNumber, address });
  }

  login(data: any, type: number) {
    return this.http.post(this.baseUrl + `login/${type === 0 ? 'customer' : 'employee'}`, data, {
      withCredentials: true
    });
  }

  setUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    this.http.post(this.baseUrl + 'logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  verifyLogin(roles?: string[]): Observable<boolean> {
    if (!localStorage.getItem('user')) {
      return of(false);
    } else if (!roles!.includes(this.getUser().type)) {
      return of(false);
    } else {
      return this.http.post(this.baseUrl + 'type', this.getUser(), {
        withCredentials: true
      }).pipe(
        map((res: any) => {
          if (res.type !== this.getUser().type) {
            this.logout();
            return false;
          }
          return roles!.includes(res.type);
        }));
    }
  }

  loginNeeded(): Observable<boolean> {
    if (!localStorage.getItem('user')) {
      return of(true);
    } else {
      return this.http.post(this.baseUrl + 'type', this.getUser(), {
        withCredentials: true
      }).pipe(
        map((res: any) => {
          if (res.type !== this.getUser().type) {
            this.logout();
            return true;
          }
          return false;
        }));
    }
  }

  getType() {
    return this.getUser().type;
  }
}