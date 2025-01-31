import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  onSearch(): void {
    this.productService.searchProducts(this.searchTerm);
  }
}