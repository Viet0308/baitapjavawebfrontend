import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getOrderDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getorderDetailsByID/${id}`);
  }

  createOrderDetail(orderDetail: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createorderDetails`, orderDetail);
  }

  updateOrderDetail(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateorderDetails/${id}`, value);
  }

  deleteOrderDetail(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orderDetails/${id}`, { responseType: 'text' });
  }

  getOrderDetailsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orderDetails`);
  }
}
