import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchComponent } from '../customershared/search/search.component';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { SellerApiService } from '../../../service/sellerapi.service';
import { Router } from '@angular/router';

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
  selectedSellerId: number = 1;
  productToDelete: any;

  constructor() { }


  @Input() productlist: any = [];
  @Input() totalPrice: number = 0;

  service = inject(SellerApiService);

  ngOnInit(): void {

    this.productlist = this.service.getCart();
    this.totalPrice = this.service.getTotalPrice();

    console.log('cart list', this.productlist);
    console.log('cart-list-total', this.totalPrice);

  }

  openDeleteModal(product: any): void {
    this.productToDelete = product;
  }

  deleteProduct(): void {
    if (this.productToDelete) {
      const index = this.productlist.findIndex((item: { id: any; }) => item.id === this.productToDelete.id);
      if (index !== -1) {
        this.productlist.splice(index, 1);
      }

      this.totalPrice = this.productlist.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);


      console.log('Product removed. Updated total price:', this.totalPrice);
    }
  }

  router = inject(Router)


  buyNow() {
    const orderRequest = {
      orderDate: new Date(),
      customerId: Number(localStorage.getItem('custId')),
      orderItems: this.productlist.map((product: { productName: any; id: any; quantity: number; price: number; }) =>
      ({
        sellerProductId: product.id,
        productName: product.productName,
        quantity: product.quantity,
        subTotalPrice: product.price
      })),
    };

    console.log(orderRequest);
    this.service.createOrder(orderRequest).subscribe(
      {
        next: (response: any) => {
          console.log('Order created successfully', response);
          alert("order placed");
        },
        error: (error) => {
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again.');
        }
      }

    );
    this.router.navigate(['/customer-dash']);
  }

}