import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';
import { CategoryService } from './category.service';
import { BrandService } from './brand.service';
import { Category } from '../models/category';
import { Brand } from '../models/brand';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import * as admin from 'firebase-admin';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firestore } from 'firebase-admin';
import DocumentSnapshot = firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private categoryService: CategoryService,
    private brandService: BrandService,
    public router: Router,
  ) {
  }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }

  products$: Observable<Product[]> = this.getProducts();
  categories$: Observable<Category[]> = this.categoryService.getCategories();
  brands$: Observable<Brand[]> = this.brandService.getBrands();


  productsArrayFiltered$ = combineLatest([
    this.products$,
    this.brands$,
    this.categories$,
  ]).pipe(
    map(([products, brands, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            categoryId: categories.find((c) => product.categoryId === c.id)?.[
              'category_name'
              ],
            brandId: brands.find((c) => product.brandId === c.id)?.[
              'brand_name'
              ],
          }) as unknown as Product,
      ),
    ),
    shareReplay(1),
  );


}
