import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
    this.calculateTotal();
  }

  getCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal(): void {
    this.total = this.cartService.calculateTotal();
  }

}
