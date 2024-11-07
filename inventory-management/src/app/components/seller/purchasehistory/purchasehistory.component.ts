import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { NavComponent } from "../../shared/nav/nav.component";
import { SellerApiService } from '../../../service/sellerapi.service';

@Component({
  selector: 'app-purchasehistory',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NavComponent],
  templateUrl: './purchasehistory.component.html',
  styleUrl: './purchasehistory.component.scss'
})
export class PurchasehistoryComponent implements OnInit {

  orders: any[] = [];
  products: any[] = [];
  selectedProductName: string = '';
  service = inject(SellerApiService);

  ngOnInit(): void {
    this.loadOrders();
  }

  onProductChange(event: any): void {
    this.selectedProductName = event ? event.productName : '';
    console.log(this.selectedProductName)
    this.loadOrders();
  }

  getOrdersByProductName(productName: string): any {
    return this.products.filter(x => x.productName === productName);
  }
  loadOrders() {
    if (!this.selectedProductName) {
      this.service.orderdetails(1).subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            this.orders = response;
            this.products = this.orders;
            console.log(this.orders);
          } else {
            alert("No products found");
          }
        },
        error: (error) => {
          console.error("Error fetching products:", error);
          alert("An error occurred while fetching products");
        }
      });
    } else {
      this.orders = this.getOrdersByProductName(this.selectedProductName);
      console.log(this.orders);
    }
  }


}
