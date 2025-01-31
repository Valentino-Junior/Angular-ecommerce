import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveToLocalStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems.pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  addToCart(product: any): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      this.cartItems.next(updatedItems);
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1
      };
      this.cartItems.next([...currentItems, newItem]);
    }

    this.saveToLocalStorage(this.cartItems.getValue());
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.getValue();
    
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = currentItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );

    this.cartItems.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

  removeFromCart(productId: number): void {
    const filteredItems = this.cartItems.getValue().filter(item => item.id !== productId);
    this.cartItems.next(filteredItems);
    this.saveToLocalStorage(filteredItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}