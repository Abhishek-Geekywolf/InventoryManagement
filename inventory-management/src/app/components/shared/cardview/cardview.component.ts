import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SellerApiService } from '../../../service/sellerapi.service';
import { Product } from '../../../models/products';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cardview',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './cardview.component.html',
  styleUrl: './cardview.component.scss'
})
export class CardviewComponent {

  router=inject(Router)
 
  service = inject(SellerApiService);
  products: Product[]=[];
  sellerData: any; 
  sellerproductid:number=0;



  ngOnInit() {
    this.loadProducts(); 
  }
  setProducts(product: any) {
    this.sellerData = { 
      sellerProductId: product.sellerProductId,
      productName: product.productName,
      availableQuantity: product.availableQuantity,
      price: product.price
    };}
    rout(){

    
    this.router.navigate(['/update-products'], { queryParams: { sellerData: JSON.stringify(this.sellerData) } });
    }
  update(id:number){
  this.sellerproductid=id;
  }







  loadProducts() {
    const sellerid = this.service.sellerid; 
    this.service.sellerproduct(sellerid).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.products = response; 
        } else {
          alert("No products found");
        }
      },
      error: (error) => {
        console.error("Error fetching products:", error);
        alert("An error occurred while fetching products");
      }
    });
  }
}




