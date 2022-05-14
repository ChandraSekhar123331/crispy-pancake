import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:3000/main/';

  getMenu(skip: number, limit: number): Observable<any> {
    return this.http.get(this.baseUrl + `menu/${skip}/${limit}`, {
      withCredentials: true
    });
  }

}
