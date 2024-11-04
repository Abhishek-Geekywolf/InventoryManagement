import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string =environment.apiBaseUrl;
  constructor() { }

  http=inject(HttpClient);

  addProduct(product :Product):void
  {
    this.http.post("https://localhost:7115/api/SellerProduct",product).subscribe(
      {
        next:(response:any)=>{
          alert('product added');
        }
      }
    )
  }

}
