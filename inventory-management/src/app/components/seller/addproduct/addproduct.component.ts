import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/products';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SellerApiService } from '../../../service/sellerapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      totalQuantity: ['', [Validators.required, Validators.min(1)]],
    });
  }


  ngOnInit(): void {

  }
  apiService = inject(SellerApiService);
  service = inject(SellerApiService)
  toaster = inject(ToastrService);
  sellerid = Number(localStorage.getItem('sellerId'))
  router = inject(Router)
  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      product.sellerid = this.sellerid;
      console.log(this.sellerid);
      this.apiService.addProduct(product).subscribe(
        {
          next:(response:any)=>{
           this.toaster.success("product added", "success");
           this.router.navigate(['/dash']);
          },
          error: (error) => {
            alert("Error adding product");
            this.toaster.error("Error adding product");
            this.router.navigate(['/customer/signup']);
          }
        });


    } else {
      console.log('Form is invalid');
      alert('Form is invalid!');

    }


  }

}
