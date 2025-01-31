import { Component, type OnInit } from "@angular/core"
import type { Observable } from "rxjs"
import type { Category } from "../../interfaces/product.interface"
import { ProductService } from "../../services/product.service"

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>

  constructor(private productService: ProductService) {
    this.categories$ = this.productService.getCategories()
  }

  ngOnInit(): void {}
}

