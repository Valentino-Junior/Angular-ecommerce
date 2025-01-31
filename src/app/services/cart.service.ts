import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateQuantity(productId: number, quantity: number) {
    throw new Error('Method not implemented.');
  }
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: any): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    }

    this.cartItems.next(currentItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems.asObservable().pipe(
      map(items => items.reduce((total, item) => total + item.price * item.quantity, 0))
    );
  }
}