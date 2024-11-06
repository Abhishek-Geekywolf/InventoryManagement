import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchComponent } from '../customershared/search/search.component';
import { Product } from '../../../models/products';
import { Order } from '../../../models/order';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { SellerApiService } from '../../../service/sellerapi.service';

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
  productToDelete: any;

  //subprice:number=0;
  constructor(){}

  
  @Input() productlist:any = []; 
  @Input() totalPrice:number=0;
  // @Input() custid:number=0;

  service=inject(SellerApiService);

  ngOnInit(): void {
    // this.products = this.purchaseservice.getProducts();
    // this.loadOrders(); // Load all orders by default
    this.productlist = this.service.getCart();
   // console.log('cart list');
   this.totalPrice=this.service.getTotalPrice();
    
    console.log('cart list',this.productlist);
    console.log('cart-list-total',this.totalPrice);
    
  }

  openDeleteModal(product: any): void {
    this.productToDelete = product;
  }

  // Delete product from cart
  deleteProduct(): void {
    if (this.productToDelete) {
      // Find index of product in the cart and remove it
      const index = this.productlist.findIndex((item: { id: any; }) => item.id === this.productToDelete.id);
      if (index !== -1) {
        this.productlist.splice(index, 1); // Remove the product from the cart array
      }

      // Recalculate the total price after deletion
      this.totalPrice = this.productlist.reduce((acc: any, item: { price: any; }) => acc + item.price, 0);
      
      // Optionally, update the cart in the service
      //this.sellerApiService.updateCart(this.productlist, this.totalPrice);

      // Close the modal (Bootstrap modal close)
      //$('#Delete').modal('hide');

      // const modalElement = document.getElementById('Delete');
      // const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
      // modal.hide(); 

      // Optionally, show a success message or alert
      console.log('Product removed. Updated total price:', this.totalPrice);
    }
  }




  buyNow() {
    const orderRequest = {
      orderDate: new Date(),
      customerId: this.service.custid,
      orderItems: this.productlist.map((product: {productName: any; id: any; quantity: number; price: number; }) => 
        ({
        sellerProductId: product.id,
        productName:product.productName,
        quantity: product.quantity,
        subTotalPrice: product.price 
        })),
        // Current date for the order
    };
  
    console.log(orderRequest);
    this.service.createOrder(orderRequest).subscribe(
      {
        next:(response:any)=>{
          console.log('Order created successfully', response);
          // alert(`Order placed successfully! Order ID: ${response.OrderId}`);
          alert("order placed");
        },
        error: (error) =>{
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again.');
        }
      }
      
    );
  }
  
}
// response => {
//   console.log('Order created successfully', response);
//  // alert(`Order placed successfully! Order ID: ${response.OrderId}`);
//  alert("order placed");
// },
// error => {
//   console.error('Error placing order:', error);
//   alert('Error placing order. Please try again.');
