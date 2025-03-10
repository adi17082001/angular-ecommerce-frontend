import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

import {Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';   // imported ng bootstrap module to provie paginationi support
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},  // added for checkout component
  {path: 'cart-details', component: CartDetailsComponent}, // added for shopping cart details
  {path: 'products/:id', component: ProductDetailsComponent}, // added for Master-Detail view of products
  {path: 'search/:keyword', component: ProductListComponent}, // added route for search products by keyword
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch:'full'},
  {path: '**', redirectTo: '/products', pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,  // imported to provide pagination support
    HttpClientModule,
    ReactiveFormsModule // added for checkout form
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
