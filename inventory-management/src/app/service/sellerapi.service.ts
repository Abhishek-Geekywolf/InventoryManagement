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

  public name: string = '';
  
  private searchSubject = new BehaviorSubject<string>(''); 
  public search$ = this.searchSubject.asObservable();


  http=inject(HttpClient)
  toaster=inject(ToastrService);
  
 

 

  addSeller(seller:sellerlogin)
  {
    this.http.post('https://localhost:7115/api/Seller',seller).subscribe(
    {
      next:(response:any)=>{
      if(response!=0)
      {
        alert("selleradded")
        this.toaster.success("seller added","success");
        this.router.navigate(['/seller/login']);

      }
      
      },
      error: (error) => {
        console.error("Error fetching products:", error);
        alert("Email already exists");
        this.toaster.success("seller added","success");
        this.router.navigate(['/seller/signup']);

      }
    });
  }
      
   
checkseller(seller:sellerlogin){
 return this.http.get(`https://localhost:7115/api/Seller?email=${seller.email}&password=${seller.password}`)}




AddCustomer(customer:customerlogin){
  this.http.post('https://localhost:7115/api/Customer',customer).subscribe({

  next:(response:any)=>{
    if(response!=0){
     alert("customerinserted")
     this.toaster.success("customer added","success");
     this.router.navigate(['/customer/login']);

    }
    else{
      alert("failed")
    }
  }
})}

checkcustomer(customer:customerlogin){
  this.http.get(`https://localhost:7115/api/Customer?email=${customer.email}&password=${customer.password}`).subscribe({
    next:(response:any)=>
      {
        if(response!=0){
          alert("customerfound")
          localStorage.setItem('custId',response)
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

  const existingProduct = this.cart.find(item => item.id === product.sellerProductId);
  console.log('p',product.availableQuantity);
  console.log(quantity);
  if (existingProduct) {
    if(existingProduct.quantity+quantity>product.availableQuantity)
    {
      alert("Total Available Quantity is less than the quantity added")
    }
    else{
      existingProduct.quantity += quantity;
      this.toaster.success("product added to cart","success");
      existingProduct.price = existingProduct.quantity * product.price;
    }
  } 
  else {
    if(quantity>product.availableQuantity)
    {
      alert("Total Available Quantity is less than the quantity added")
    }
    else{
      this.subprice=quantity*product.price;
      const cartProduct = {
        productName: product.productName,
        price: this.subprice,
        quantity: quantity,
        id: product.sellerProductId
      };
      this.cart.push(cartProduct);
      this.toaster.success("product added to cart","success");

          }
  }

  this.totalPrice = this.cart.reduce((acc, item) => acc + item.price, 0);
  console.log('Total price:', this.totalPrice);


  console.log('Cart after update:', this.cart);
}

getCart(): any[] {
  return this.cart;
}

getTotalPrice(): number {
  return this.totalPrice;
}


updateProduct(sellerid:number,productData:any){
  return this.http.put(`https://localhost:7115/api/SellerProduct/name?id=${sellerid}`,productData);

}
getCustomerOrderHistory(id:number){
  return this.http.get(`https://localhost:7115/api/Order?id=${id}`);
}


createOrder(orderRequest:any)
{
  return this.http.post("https://localhost:7115/api/OrderDetails",orderRequest)
}
addProduct(product :Product):void
  {
    this.http.post("https://localhost:7115/api/SellerProduct",product).subscribe(
      {
        next:(response:any)=>{
         this.toaster.success("product added","success");
          
        }
      }
    )
  }

}