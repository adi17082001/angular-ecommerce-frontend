import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
      this.listCartDetails();
  }

  // modify the cart details component to retrieve data fro the cart service

  listCartDetails(){

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  // new method to increment quantity
  incrementQuantity(theCartItem: CartItem){
    this.cartService.addToCart(theCartItem);
  }

  // method to decrement quantity
  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  // method to remove the item from cart
  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }
}
