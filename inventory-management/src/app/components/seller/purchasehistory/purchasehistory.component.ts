import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { NavComponent } from "../../shared/nav/nav.component";
import { SellerApiService } from '../../../service/sellerapi.service';
import { ToastrService } from 'ngx-toastr';

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
  toaster = inject(ToastrService);

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
      this.service.orderdetails(Number(localStorage.getItem('sellerId'))).subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            this.orders = response;
            this.products = this.orders;
            console.log(this.orders);
          } 
        },
        error: (error) => {
          console.error("Error fetching products:", error);
          this.toaster.error("No purchase history found");
        }
      });
    } else {
      this.orders = this.getOrdersByProductName(this.selectedProductName);
      console.log(this.orders);
    }
  }


}
