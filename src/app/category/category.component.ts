import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  editCategory(category: Category) {
    // Implement your edit logic here
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
    });
  }

  onSubmit(form: NgForm) {
    const newCategory: Category = {
      name: form.value.name,
      id: 0
    };
    this.categoryService.createCategory(newCategory).subscribe(category => {
      this.categories.push(category);
    });
  }
}
