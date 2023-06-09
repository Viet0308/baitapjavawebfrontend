import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  removeProduct(product: Product) {
    const index = this.products.findIndex((prod) => prod.id === product.id);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.cart.next(this.products); // this will make sure to tell every subscriber about the change.
    }
  }

  getCartItems(): Product[] {
    return this.products;
  }

  calculateTotal() {
    return this.products.reduce((acc, prod) => acc + prod.price, 0);
  }
}
