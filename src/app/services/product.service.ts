import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, Category } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts(): Observable<Product[]> {
    return this.apollo.watchQuery<{ products: Product[] }>({
      query: gql`
        query GetProducts {
          products {
            id
            title
            price
            description
            category {
              id
              name
            }
            images
          }
        }
      `
    })
    .valueChanges.pipe(map(result => result.data.products));
  }

  getCategories(): Observable<Category[]> {
    return this.apollo.watchQuery<{ categories: Category[] }>({
      query: gql`
        query GetCategories {
          categories {
            id
            name
            image
          }
        }
      `
    })
    .valueChanges.pipe(map(result => result.data.categories));
  }

  getProductById(id: number): Observable<Product> {
    return this.apollo.watchQuery<{ product: Product }>({
      query: gql`
        query GetProduct($id: ID!) {
          product(id: $id) {
            id
            title
            price
            description
            category {
              id
              name
            }
            images
          }
        }
      `,
      variables: { id }
    })
    .valueChanges.pipe(map(result => result.data.product));
  }
}