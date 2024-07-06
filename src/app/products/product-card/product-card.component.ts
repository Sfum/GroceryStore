import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductService } from '../../services/product.service';

import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  filteredProducts$ = new BehaviorSubject<Product[]>([]);
  paginatedProducts: Product[] = [];
  currentPage = 0;
  itemsPerPage = 8;
  searchQuery: string = '';

  @Input() products!: Product[];
  @Input() product!: Product;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.products$ = this.productService.productsArrayFiltered$;
    this.products$.subscribe((products) => {
      this.applyFilter(products);
    });
  }

  applyFilter(products: Product[]) {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.filteredProducts$.next(filtered);
    this.paginate(filtered);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.filteredProducts$.subscribe((products) => {
      this.paginate(products);
    });
  }

  paginate(products: Product[]) {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = products.slice(start, end);
  }

  onAddToWishlist(product: any) {
  }

  onAddToCart(product: any) {
  }

  private getDate(date?: Timestamp | Date): Date {
    if (date instanceof Timestamp) {
      return date.toDate();
    } else if (date instanceof Date) {
      return date;
    } else {
      return new Date(0);
    }
  }
}
