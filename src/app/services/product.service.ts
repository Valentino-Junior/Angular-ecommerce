import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts(): Observable<any[]> {
    return this.apollo.watchQuery<any>({
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

  getCategories(): Observable<any[]> {
    return this.apollo.watchQuery<any>({
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

  getProductById(id: number): Observable<any> {
    return this.apollo.watchQuery<any>({
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