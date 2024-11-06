import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/products';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [NavComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit{

  productForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      sellerId:['',Validators.required],
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      totalQuantity: ['', [Validators.required, Validators.min(1)]],
    });
  }


  ngOnInit(): void {
    
  }

  apiService=inject(ApiService);

  onSubmit()
  {
    if(this.productForm.valid)
    {
      const product: Product = this.productForm.value; 
      console.log('Form Submitted!', product);
      alert('Form Submitted!');
      this.apiService.addProduct(product);

    } else {
      console.log('Form is invalid');
      alert('Form is invalid!');

    }

    
  }

}
