# Angular E-commerce Project

This project is an e-commerce web application built with Angular, featuring a modern UI with product listing, cart management, and checkout functionality.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd angular-ecommerce

# Install dependencies
npm install

# Start development server
ng serve
```

Visit `http://localhost:4200` in your browser.

## Features

### Product Management
- Product listing with grid view
- Product details with images
- Category filtering
- Search functionality

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Price calculation
- Persistent cart data

### Checkout
- User information form
- Order summary
- Form validation
- Success confirmation

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/
│   │   │   ├── product-list.component.ts
│   │   │   ├── product-list.component.html
│   │   │   └── product-list.component.css
│   │   ├── product-detail/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── order-success/
│   ├── services/
│   │   ├── product.service.ts
│   │   └── cart.service.ts
│   └── interfaces/
│       └── product.interface.ts
├── assets/
└── environments/
```

## Development Guidelines

### Component Creation
```bash
ng generate component components/component-name
```

### Service Creation
```bash
ng generate service services/service-name
```

### Running Tests
```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

## Build

To build for production:

```bash
ng build --configuration production
```

Build files will be in the `dist/` directory.

## Dependencies

- Angular 15+
- RxJS
- Apollo GraphQL Client
- Angular Forms

## API Integration

The application uses GraphQL with the following endpoint:
```typescript
const uri = 'https://api.escuelajs.co/graphql';
```

## Key Components

### ProductListComponent
- Displays products in a grid
- Implements filtering and search
- Handles add to cart functionality

### CartComponent
- Shows cart items
- Manages quantities
- Calculates totals
- Provides checkout navigation

### CheckoutComponent
- Collects user information
- Shows order summary
- Handles form validation
- Processes order submission

### OrderSuccessComponent
- Displays success message
- Provides navigation options
- Shows order confirmation

## Services

### ProductService
Handles product data:
```typescript
getProducts(): Observable<Product[]>
getProductById(id: number): Observable<Product>
getCategories(): Observable<Category[]>
```

### CartService
Manages cart operations:
```typescript
addToCart(product: Product): void
removeFromCart(productId: number): void
updateQuantity(productId: number, quantity: number): void
getTotalPrice(): Observable<number>
```

## Styles

The project uses modern CSS features:
- Flexbox and Grid layouts
- CSS variables
- Responsive design
- Animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Create Pull Request

## License

This project is licensed under the MIT License.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/angular-ecommerce](https://github.com/yourusername/angular-ecommerce)