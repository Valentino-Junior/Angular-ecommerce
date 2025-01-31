import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();

  constructor(private apollo: Apollo) {}

  getProducts(searchTerm: string = ''): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query GetProducts($searchTerm: String) {
          products(where: { title_contains: $searchTerm }) {
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
      variables: { searchTerm }
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
          product(where: { id: $id }) {
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

  searchProducts(term: string): void {
    this.searchTermSource.next(term);
  }
}