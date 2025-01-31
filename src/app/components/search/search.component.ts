import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.productService.searchProducts(this.searchTerm);
  }
}