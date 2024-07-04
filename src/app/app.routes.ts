import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {ProductCardComponent} from "./products/product-card/product-card.component";

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
