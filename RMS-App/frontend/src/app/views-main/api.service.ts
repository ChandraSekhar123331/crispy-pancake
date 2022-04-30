import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:3000/';

  loadDishes(skip: number, lim: number) {
    const url = this.baseUrl + `menu/basic/?skip=${skip}&lim=${lim}`;
    return this.http.get(url);
  }

  prevOrders() {
    const url = this.baseUrl + `orders/prev`;
    return this.http.get(url);
  }
}
