import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { ProductListComponent } from "./components/product-list/product-list.component"
import { ProductDetailComponent } from "./components/product-detail/product-detail.component"
import { CartComponent } from "./components/cart/cart.component"
import { CheckoutComponent } from "./components/checkout/checkout.component"
import { OrderSuccessComponent } from "./components/order-success/order-success.component"
import { CategoryListComponent } from "./components/category-list/category-list.component"

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "categories", component: CategoryListComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "order-success", component: OrderSuccessComponent },
  { path: "**", redirectTo: "/products" }, // Wildcard route for a 404 page
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

