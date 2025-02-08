import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;

  constructor(private productServie: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.handleProductDetails();
      })
  }
  // new methood to dispay product details in the Master-Detail view.
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productServie.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
