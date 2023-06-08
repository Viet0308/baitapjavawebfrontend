import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const newProduct: Product = {
      name: form.value.name,
      price: form.value.price,
      image: form.value.image,
      id: 0
    };
    this.productService.createProduct(newProduct).subscribe(product => {
      form.reset();
      alert('Product added successfully!');
    });
  }
}
