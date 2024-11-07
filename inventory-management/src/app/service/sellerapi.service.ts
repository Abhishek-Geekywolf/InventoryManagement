import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { sellerlogin } from '../models/sellerlogin';
import { Router } from '@angular/router';
import { customerlogin } from '../models/customerlogin';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products';
import { updateProduct } from '../models/updateproduct';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class SellerApiService {

  url:string='https://localhost:7115/api/Seller';
  public router = inject(Router); 
  public name: string = '';
  products: Product[] = [];
  selectedSellerId: number = 1;
  http=inject(HttpClient)
  toaster=inject(ToastrService);
  
  addSeller(seller:sellerlogin)
  {
    return this.http.post('https://localhost:7115/api/Seller',seller)
  }




  AddCustomer(customer: customerlogin) {
    return this.http.post('https://localhost:7115/api/Customer', customer)
  }



  checkcustomer(customer: customerlogin) {
    this.http.get(`https://localhost:7115/api/Customer?email=${customer.email}&password=${customer.password}`).subscribe({
      next: (response: any) => {
        if (response != 0) {
          alert("customerfound")
          localStorage.setItem('custId', response)
          this.router.navigate(['/customer-dash']);
        }
        else {
          alert("customernotfound")
        }
      }
    })
  }


  sellerproduct(sellerid: number) {
    return this.http.get(`https://localhost:7115/api/SellerProduct/id?id=1`)

  }
  orderdetails(sellerid: number) {
    return this.http.get(`https://localhost:7115/api/Order/id?id=${sellerid}`)
  }

  customerproduct() {
    return this.http.get("https://localhost:7115/api/SellerProduct");
  }

  public cart: any[] = [];
  public subprice: number = 0;
  public totalPrice: number = 0;

  addToCart(customerId: number,product: any, quantity: number): void {

    this.cart = this.getCart(customerId);

  
    const existingProduct = this.cart.find(item => item.id === product.sellerProductId);
    console.log('p', product.availableQuantity);
    console.log(quantity);
    if (existingProduct) {
      if (existingProduct.quantity + quantity > product.availableQuantity) {
        alert("Total Available Quantity is less than the quantity added")
      }
      else {
        existingProduct.quantity += quantity;
        // this.toaster.success("product added to cart","success");
        existingProduct.price = existingProduct.quantity * product.price;
      }
    }
    else {
      if (quantity > product.availableQuantity) {
        alert("Total Available Quantity is less than the quantity added")
      }
      else {
        this.subprice = quantity * product.price;
        const cartProduct = {
          productName: product.productName,
          price: this.subprice,
          quantity: quantity,
          id: product.sellerProductId
        };
        this.cart.push(cartProduct);
        // this.toaster.success("product added to cart","success");

      }
    }

    localStorage.setItem(`cart_${customerId}`, JSON.stringify(this.cart));
    console.log('Updated Cart:', this.cart);
    
    this.totalPrice = this.cart.reduce((acc, item) => acc + item.price, 0);
    console.log('Total price:', this.totalPrice);


    console.log('Cart after update:', this.cart);
  }

  // getCart(): any[] {
  //   return this.cart;
  // }

  getCart(customerId: number): any[] {
    const cart = localStorage.getItem(`cart_${customerId}`);
  if (cart) {
    console.log('Cart found:', JSON.parse(cart));  // Debugging log to check if the cart is being fetched
    return JSON.parse(cart);
  } else {
    console.log('No cart found for customerId:', customerId);  // Debugging log if no cart is found
    return [];
  }
  }

  clearCart(customerId: number): void {
    localStorage.removeItem(`cart_${customerId}`);  // Clear cart from localStorage
  }
  getTotalPrice(): number {
    return this.totalPrice;
  }


  updateProduct(sellerid: number, productData: any) {
    return this.http.put(`https://localhost:7115/api/SellerProduct/name?id=${sellerid}`, productData);

  }
  getCustomerOrderHistory(id: number) {
    return this.http.get(`https://localhost:7115/api/Order?id=${id}`);
  }


createOrder(orderRequest:any)
{
  return this.http.post("https://localhost:7115/api/OrderDetails",orderRequest)
}
addProduct(product :Product)
  {
   return this.http.post("https://localhost:7115/api/SellerProduct",product)
  }
  getProducts(): Product[] {
    return this.products;
  }

  getOrdersByProductName(productName: string) {
    return this.http.get(`https://localhost:7115/api/Order/name?name=${productName}`)
  }

  getAllOrders(selectedSellerId: number) {
    return this.http.get(`https://localhost:7115/api/Order/id?id=${selectedSellerId}`);
  }


}