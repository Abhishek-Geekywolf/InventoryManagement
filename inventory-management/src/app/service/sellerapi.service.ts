 import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { sellerlogin } from '../models/sellerlogin';
import { Router } from '@angular/router';
import { customerlogin } from '../models/customerlogin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SellerApiService {

  url:string='https://localhost:7115/api/Seller';
  public router = inject(Router); 
  public sellerid:number=0;


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
 return this.http.get(`https://localhost:7115/api/SellerProduct/id?id=${sellerid}`)

}

customerproduct()
{
  return this.http.get("https://localhost:7115/api/SellerProduct");
}

public cart: any[] = [];
public subprice:number=0;

addToCart(product: any, quantity: number): void {
  const existingProduct = this.cart.find(item => item.id === product.id);
  if (existingProduct) {
    // Update quantity if product already exists in cart
    existingProduct.quantity += quantity;
  } else {
    // Add new product to cart
    this.subprice=quantity*product.price;
    const cartProduct = {
      productName: product.productName,
      price: this.subprice,
      quantity: quantity,
      id: product.id
    };
    this.cart.push(cartProduct);
  }
}

getCart(): any[] {
  return this.cart;
}




}