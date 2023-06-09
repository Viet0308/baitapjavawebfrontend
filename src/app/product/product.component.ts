import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CartService } from '../cart/cart.service'; // Thêm dòng này
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null; 
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.addToCartSuccess = true;
    const successMessage = `Thêm sản phẩm ${product.name} vào giỏ hàng thành công`;
    alert(successMessage);
  }

  editProduct(product: Product) {
    this.editingProduct = product;
  }
  
  addToCartSuccess = false;


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      alert('Product deleted successfully!'); // Show an alert
    });
  }

  onSubmit(form: NgForm) {
    const newProduct: Product = {
      name: form.value.name,
      price: form.value.price,
      id: 0,
      image: form.value.image,
      quantity: 0
    };
    this.productService.createProduct(newProduct).subscribe(product => {
      this.products.push(product);
      form.reset(); // Reset the form
      alert('Product added successfully!'); // Show an alert
    });
  }

  viewCartItems() {
    const cartItems = this.cartService.getCartItems();
    this.router.navigate(['/cart']);
  }

  onSubmitEdit(form: NgForm) {
    if (this.editingProduct) {
      this.editingProduct.image = form.value.image;
       this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(product => {
        const index = this.products.findIndex(p => p.id === this.editingProduct?.id);
        if (index !== -1 && product) {
          this.products[index] = product;
        }
        this.editingProduct = null;
        form.reset(); // Reset the form
        alert('Product updated successfully!'); // Show an alert
      });
    }
  }
  
  
}
