import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchComponent } from '../customershared/search/search.component';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { PurchasehistoryService } from '../../../service/purchasehistory.service';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { ProductList } from '../../../models/customercartlist';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgSelectModule, CommonModule, SearchComponent, CustomernavComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  products: Product[] = [];
  orders: Order[] = [];
  selectedProductName: string = ''; 
  selectedSellerId: number=1;
  constructor(private purchaseservice:PurchasehistoryService){}
  
  ngOnInit(): void {
    this.products = this.purchaseservice.getProducts();
    this.loadOrders(); // Load all orders by default
  }

 

  onProductChange(event: any): void {
    this.selectedProductName = event ? event.productName.value : ''; // Handle empty selection
    this.loadOrders();
}


  loadOrders(): void {
    if (!this.selectedProductName) {
      this.purchaseservice.getAllOrders(this.selectedSellerId); // Show all orders
    } else {
      this.purchaseservice.getOrdersByProductName(this.selectedProductName);
    }
  }



   productlist:ProductList[] = [
    {
        productName: new FormControl('Product A'),
        price: new FormControl(20),
        quantity: new FormControl(10),
    },
    {
        productName: new FormControl('Product B'),
        price: new FormControl(40),
        quantity: new FormControl(20),
    },
    {
        productName: new FormControl('Product C'),
        price: new FormControl(70),
        quantity: new FormControl(30),
    },
];









}
