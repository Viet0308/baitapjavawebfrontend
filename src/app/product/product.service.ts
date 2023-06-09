import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('withCredentials', 'true');
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { headers });
  }

  getProductById(id: number): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('withCredentials', 'true');
    return this.http.get<Product>(`${this.apiUrl}/getProdByID/${id}`, { headers });
  }

  addProductToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/addProductToCart`, product);
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('withCredentials', 'true');
    return this.http.post<Product>(`${this.apiUrl}/createProd`, product, { headers });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('withCredentials', 'true');
    return this.http.put<Product>(`${this.apiUrl}/updateProd/${id}`, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('withCredentials', 'true');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }


}
