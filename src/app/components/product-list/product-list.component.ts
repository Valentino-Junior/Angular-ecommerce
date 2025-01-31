import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  priceRange: { min: number, max: number } = { min: 0, max: 1000 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    const filters = {
      category: this.selectedCategory,
      price_min: this.priceRange.min,
      price_max: this.priceRange.max
    };
    this.productService.getProducts(filters, this.selectedSort).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  onSortChange(sort: string): void {
    this.selectedSort = sort;
    this.loadProducts();
  }

  onPriceRangeChange(): void {
    this.loadProducts();
  }
}