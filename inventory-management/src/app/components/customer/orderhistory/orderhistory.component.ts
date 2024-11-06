import { Component } from '@angular/core';
import { CustomernavComponent } from '../customershared/customernav/customernav.component';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../customershared/search/search.component";

@Component({
  selector: 'app-orderhistory',
  standalone: true,
  imports: [CustomernavComponent, NgSelectModule, CommonModule, SearchComponent],
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.scss'
})
export class OrderhistoryComponent {
  products: Product[] = [];
  orders: Order[] = [];
  selectedProductName: string = ''; 
  selectedSellerId:number=1;
  

  constructor(){}
  
  ngOnInit(): void {
    // this.products = this.purchaseservice.getProducts();
    // this.loadOrders(); // Load all orders by default
  }

 

//   onProductChange(event: any): void {
//     this.selectedProductName = event ? event.productName.value : ''; // Handle empty selection
//     this.loadOrders();
// }


//   loadOrders(): void {
//     if (!this.selectedProductName) {
//       this.purchaseservice.getAllOrders(this.selectedSellerId); // Show all orders
//     } else {
//       this.purchaseservice.getOrdersByProductName(this.selectedProductName);
//     }
//   }

}



