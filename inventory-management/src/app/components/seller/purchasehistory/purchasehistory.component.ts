import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { NavComponent } from "../../shared/nav/nav.component";
import { PurchasehistoryService } from '../../../service/purchasehistory.service';

@Component({
  selector: 'app-purchasehistory',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NavComponent],
  templateUrl: './purchasehistory.component.html',
  styleUrl: './purchasehistory.component.scss'
})
export class PurchasehistoryComponent implements OnInit{

  products: Product[] = [];
  orders: Order[] = [];
  selectedProductName: string = ''; 
  selectedSellerId: number = 1;
  

  constructor(private purchaseservice:PurchasehistoryService){}
  
  ngOnInit(){
    this.products = this.purchaseservice.getProducts();
    this.loadOrders(); // Load all orders by default
  }

  // onProductChange(productName: string): void {
  //   this.selectedProductName = productName;
  //   this.loadOrders();
  // }

  onProductChange(event: any): void {
    this.selectedProductName = event ? event.productName.value : ''; // Handle empty selection
    this.loadOrders();
}


  loadOrders() {
    if (!this.selectedProductName) {
      this.purchaseservice.getAllOrders(this.selectedSellerId).subscribe(
        {
          next: (orders: any) => {
            this.orders = orders; // Store fetched orders
          },
          error: (error) => {
            console.error('Error fetching orders', error);
            this.orders = []; // Clear orders on error
          }
        }
      )
    } else {
      this.purchaseservice.getOrdersByProductName(this.selectedProductName);
    }
  }

}
