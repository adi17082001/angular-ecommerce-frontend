import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  
  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
          private route: ActivatedRoute){ }

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    
  }
  
  listProducts(){

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;  // make note of !. 
      // this is a non-null assertion operator. Tells the compiler that the object is not null.
    }
    else{
      // category id not available ...default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products = data;  // assign results to the product array
      }
    )
  }
}
