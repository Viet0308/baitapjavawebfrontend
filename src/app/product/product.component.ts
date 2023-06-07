import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null; 
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(product: Product) {
    this.editingProduct = product;
  }
  

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  onSubmit(form: NgForm) {
    const newProduct: Product = {
      name: form.value.name,
      price: form.value.price,
      id: 0
    };
    this.productService.createProduct(newProduct).subscribe(product => {
      this.products.push(product);
    });
  }

  onSubmitEdit(form: NgForm) {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(product => {
        const index = this.products.findIndex(p => p.id === this.editingProduct?.id);
        if (index !== -1 && product) {
          this.products[index] = product;
        }
        this.editingProduct = null;
      });
    }
  }
  
  
}
