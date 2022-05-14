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

  getDishInfo(id: number) {
    return this.http.get(`${this.baseUrl}dish/${id}`, {
      withCredentials: true
    });
  }

  submitOrder(order: any) {
    return this.http.post(`${this.baseUrl}order`, order, {
      withCredentials: true
    });
  }

  getFreeWaiters() {
    return this.http.get(`${this.baseUrl}free-waiters`, {
      withCredentials: true
    });
  }

  getVacantTables(data: any) {
    return this.http.get(`${this.baseUrl}vacant-tables/${data.floor}/${data.size}`, {
      withCredentials: true
    });
  }

  bookTable(data: any) {
    return this.http.post(`${this.baseUrl}book-table`, data, {
      withCredentials: true
    });
  }

  getCustomerInfo(username: string) {
    return this.http.get(`${this.baseUrl}customer-info/${username}`, {
      withCredentials: true,
    });
  }

  saveOrder(data: any) {
    localStorage.setItem('order', JSON.stringify(data));
  }

  getOrder() {
    return JSON.parse(localStorage.getItem('order')!);
  }

  assignWaiter(waiter: number, bill: number) {
    return this.http.post(`${this.baseUrl}assign-waiter`, { waiter, bill }, {
      withCredentials: true
    });
  }

  getActiveBill(waiter: number) {
    return this.http.get(`${this.baseUrl}active-bill/${waiter}`, {
      withCredentials: true
    });
  }

}
