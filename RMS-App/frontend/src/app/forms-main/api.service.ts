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

  getVacantTables(data: { floor: number, startTime: string, size: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getFreeTablesFloor`, data);
  }

  bookTable(data: { userId: number, tableId: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/table/book`, data);
  }

}
