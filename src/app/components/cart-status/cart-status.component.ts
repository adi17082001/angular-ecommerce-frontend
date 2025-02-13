import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{
  
  // Enhanced the cart status component to subscribe to the cart service

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  // inject the CartService in the constructor
  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
      this.updateCartStatus();
  }

  // in this method, we'll actually subscribe for the events on the cart service
  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    
  }
}
