import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$ = this.getCategories();

  constructor(private firestore: AngularFirestore,

  ) {}

  getCategories(): Observable<any[]> {
    return this.firestore.collection('categories').valueChanges();
  }
}
