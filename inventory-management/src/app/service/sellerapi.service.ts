 import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { sellerlogin } from '../models/sellerlogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerApiService {

  url:string='https://localhost:7115/api/Seller';
  private router = inject(Router); 


  http=inject(HttpClient)
  addSeller(seller:sellerlogin)
  {
    this.http.post('https://localhost:7115/api/Seller',seller).subscribe(
    {
      next:(response:any)=>
      {
        alert("selleradded")
      }
    }
  )}
checkseller(seller:sellerlogin){
  this.http.get(`https://localhost:7115/api/Seller?email=${seller.email}&password=${seller.password}`).subscribe(
    {
      next:(response:any)=>
      {
        if(response!=0){
          alert("sellerfound")



          
          this.router.navigate(['/dash']);


        }
        else{
          alert("sellernotfound")

        }

      }
    }
  ) 
  
}

 
  }

