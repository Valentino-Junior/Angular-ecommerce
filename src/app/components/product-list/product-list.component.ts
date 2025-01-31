import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<any[]>;
  searchTerm$: Observable<string>;
  filteredProducts$: Observable<any[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.searchTerm$ = this.productService.searchTerm$;
    this.products$ = this.productService.getProducts();

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchTerm$
    ]).pipe(
      map(([products, searchTerm]) =>
        products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  ngOnInit(): void {
    // No need for any initialization logic here
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}