import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:3000';

  constructor(
    private http: HttpClient
  ) { }

  getVacantTables(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/table/getFreeTablesFloor`, {
      params: {
        floor: data.floor,
        occupancy: data.size,
        startTime: data.datetime
      }
    });
  }

  bookTable(data: { customerId: number, tableList: number, startTime: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/table/bookTable`, data);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user')!);
  }

}
