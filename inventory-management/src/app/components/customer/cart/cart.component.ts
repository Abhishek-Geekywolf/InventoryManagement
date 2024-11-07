import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchComponent } from '../customershared/search/search.component';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { SellerApiService } from '../../../service/sellerapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  customerId:number=0;
  cart: any[] =[];

  constructor() { }


  @Input() productlist: any = [];
  @Input() totalPrice: number = 0;

  service = inject(SellerApiService);
  router = inject(Router)
  toaster = inject(ToastrService);

  ngOnInit(): void {

    //this.productlist = this.service.getCart();
    this.totalPrice = this.service.getTotalPrice();

   // console.log('cart list', this.productlist);
    console.log('cart-list-total', this.totalPrice);

    this.customerId = Number(localStorage.getItem('custId'));  // Fetch the customerId from localStorage
    console.log('Customer ID from localStorage:', this.customerId); // Debugging log

    if (this.customerId) {
      this.cart = this.service.getCart(this.customerId);  // Fetch the cart using the customerId
      console.log('Loaded cart:', this.cart);  // Debugging log
    } else {
      console.log('No customer ID found. Cart will not load.'); 
    }

  }

  openDeleteModal(product: any): void {
    this.productToDelete = product;
  }

  deleteProduct(): void {
    if (this.productToDelete) {
      const index = this.cart.findIndex((item: { id: any; }) => item.id === this.productToDelete.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }

<<<<<<< HEAD
      this.totalPrice = this.cart.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);

      localStorage.setItem(`cart_${this.customerId}`, JSON.stringify(this.cart));
=======
      this.totalPrice = this.productlist.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);
      this.toaster.success("seller added","success");
>>>>>>> 4be5300779f884fc4a763ea38520fd8373115a69


      console.log('Product removed. Updated total price:', this.totalPrice);

    
    }
  }

<<<<<<< HEAD

 

  router = inject(Router)
=======
>>>>>>> 4be5300779f884fc4a763ea38520fd8373115a69


  buyNow() {
    const orderRequest = {
      orderDate: new Date(),
      customerId: Number(localStorage.getItem('custId')),
      orderItems: this.cart.map((product: { productName: any; id: any; quantity: number; price: number; }) =>
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
          this.toaster.success("order placed");
          this.router.navigate(['/customer-dash']);
        },
        error: (error) => {
          this.toaster.error("error placing order");
        }
        
      },


    );
<<<<<<< HEAD
    this.router.navigate(['/customer-dash']);
    this.service.clearCart(this.customerId);
=======
>>>>>>> 4be5300779f884fc4a763ea38520fd8373115a69
  }

}