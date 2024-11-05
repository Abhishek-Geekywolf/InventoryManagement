import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { FormControl } from '@angular/forms';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {

  constructor() { }

  //private products: Product[] = [
    // {

    //     productName: new FormControl('Product A'),
    //     price: new FormControl(100),
    //     quantity: new FormControl(10),
    // },
    // {
    //     productName: new FormControl('Product B'),
    //     price: new FormControl(150),
    //     quantity: new FormControl(20),
    // },
    // {
    //     productName: new FormControl('Product C'),
    //     price: new FormControl(200),
    //     quantity: new FormControl(30),
    // },
//];
// private orders: Order[] = [
//   {
//       orderId: new FormControl(1),
//       productName: new FormControl('Product A'),
//       customerId: new FormControl(101),
//       quantity: new FormControl(2),
//       subPrice: new FormControl(200),
//       date: new FormControl(new Date('2024-01-15')),
//   },
//   {
//       orderId: new FormControl(2),
//       productName: new FormControl('Product B'),
//       customerId: new FormControl(102),
//       quantity: new FormControl(1),
//       subPrice: new FormControl(150),
//       date: new FormControl(new Date('2024-02-20')),
//   },
//   {
//       orderId: new FormControl(3),
//       productName: new FormControl('Product C'),
//       customerId: new FormControl(103),
//       quantity: new FormControl(3),
//       subPrice: new FormControl(600),
//       date: new FormControl(new Date('2024-03-10')),
//   },
// ];

products: Product[] = [];
  orders: Order[] = [];
  selectedSellerId: number = 1;

http=inject(HttpClient);

  getProducts(): Product[] {
    return this.products;
  }

  getOrdersByProductName(productName: string) {
    return this.http.get(`https://localhost:7115/api/Order/name?name=${productName}`)
   // return this.orders.filter(order => order.productName.value === productName);
  }

  getAllOrders(selectedSellerId: number) {
    return this.http.get(`https://localhost:7115/api/Order/id?id=${selectedSellerId}`);
  }

}
