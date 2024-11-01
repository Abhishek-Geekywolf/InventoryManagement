import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/products';
import { CommonModule } from '@angular/common';

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
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productQuantity: ['', [Validators.required, Validators.min(1)]],
    });
  }


  ngOnInit(): void {
    
  }

  onSubmit()
  {
    if(this.productForm.valid)
    {
      const product: Product = this.productForm.value; // Create a product object
      console.log('Form Submitted!', product);
      // Here you can handle the form data, e.g., send it to a server
    } else {
      console.log('Form is invalid');
    }

    
  }

}
