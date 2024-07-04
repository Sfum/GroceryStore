import { Component, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from "../../models/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  paginatedProducts: Product[] = [];

  @Input() products!: Product[];
  @Input() product!: Product;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    this.products$.subscribe((products: Product[]) => {
      this.paginatedProducts = products;
    });
  }
}
