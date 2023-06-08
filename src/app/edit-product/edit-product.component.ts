import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editingProduct: Product | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe(product => {
        this.editingProduct = product;
      });
    }
  }

  onSubmitEdit(form: NgForm) {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(product => {
        form.reset();
        alert('Product updated successfully!');
      });
    }
  }
}
