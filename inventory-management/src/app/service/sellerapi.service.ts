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

@Injectable({
  providedIn: 'root'
})
export class SellerApiService {

  url:string='https://localhost:7115/api/Seller';
  public router = inject(Router); 
  public sellerid:number=0;
  public name: string = '';
  
  private searchSubject = new BehaviorSubject<string>(''); 
  public search$ = this.searchSubject.asObservable();


  http=inject(HttpClient)
  toaster=inject(ToastrService);

  addSeller(seller:sellerlogin)
  {
    this.http.post('https://localhost:7115/api/Seller',seller).subscribe(
    {
      next:(response:any)=>
      {
        //alert("selleradded")
        this.toaster.success("seller added","success");
        this.router.navigate(['/seller/login']);

      }
    }
  )}
checkseller(seller:sellerlogin){
 return this.http.get(`https://localhost:7115/api/Seller?email=${seller.email}&password=${seller.password}`)}

 setsellerid(id:number)
{
  this.sellerid=id;
} 



AddCustomer(customer:customerlogin){
  this.http.post('https://localhost:7115/api/Customer',customer).subscribe({

  next:(response:any)=>{
    if(response!=0){
     // alert("customerinserted")
     this.toaster.success("customer added","success");
     this.router.navigate(['/customer/login']);

    }
    else{
      alert("failed")
    }
  }
})}
public custid:number=0;

checkcustomer(customer:customerlogin){
  this.http.get(`https://localhost:7115/api/Customer?email=${customer.email}&password=${customer.password}`).subscribe({
    next:(response:any)=>
      {
        if(response!=0){
          alert("customerfound")
          this.custid=response;
          this.router.navigate(['/customer-dash']);
        }
        else{
          alert("customernotfound")
        }
      }
  })
}


sellerproduct(sellerid:number){
 return this.http.get(`https://localhost:7115/api/SellerProduct/id?id=1`)

}
orderdetails(sellerid:number){
  return this.http.get(`https://localhost:7115/api/Order/id?id=${sellerid}`)
}

customerproduct()
{
  return this.http.get("https://localhost:7115/api/SellerProduct");
}

public cart: any[] = [];
public subprice:number=0;
public totalPrice:number=0;

addToCart(product: any, quantity: number): void {
  console.log('Product received in API:', product);
  
  // Check if the product already exists in the cart
  const existingProduct = this.cart.find(item => item.id === product.sellerProductId);
  if (existingProduct) {
    // If the product already exists, update the quantity
    console.log('Product already in cart. Updating quantity:', existingProduct.quantity, '=>', existingProduct.quantity + quantity);
    existingProduct.quantity += quantity;
    existingProduct.price = existingProduct.quantity * product.price;
    console.log('Updated product in cart:', existingProduct);

  
  } else {
    // If the product is not in the cart, add it as a new product
    const subPrice = quantity * product.price;  // Calculate the subtotal price for the new quantity
    const cartProduct = {
      productName: product.productName,
      price: subPrice,
      quantity: quantity,
      id: product.sellerProductId
    };
    this.cart.push(cartProduct);
    console.log('Product added to cart:', cartProduct);
  }

  this.totalPrice = this.cart.reduce((acc, item) => acc + item.price, 0);
  console.log('Total price:', this.totalPrice);


  // Debugging the cart after the update
  console.log('Cart after update:', this.cart);
}

getCart(): any[] {
  return this.cart;
}

getTotalPrice(): number {
  return this.totalPrice;
}


updateProduct(sellerid:number,productData:any){
  return this.http.put(`https://localhost:7115/api/SellerProduct/name?id=${sellerid}`,productData)

}


createOrder(orderRequest:any)
{
  return this.http.post("https://localhost:7115/api/OrderDetails",orderRequest)
}

}