import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://127.0.0.1:3000';

  login(credentials: any, type: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${type}/login`, credentials, {
      headers: {
        credentials: 'include'
      }
    });
  }

  register(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/create`, credentials);
  }

}
