import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, CartItem } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next(currentItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item => 
      item.product.id === productId ? { ...item, quantity: quantity } : item
    ).filter(item => item.quantity > 0);

    this.cartItems.next(updatedItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems.asObservable().pipe(
      map(items => items.reduce((total, item) => total + item.product.price * item.quantity, 0))
    );
  }
}