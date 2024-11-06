import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/products';
import { CommonModule } from '@angular/common';
import { SellerApiService } from '../../../service/sellerapi.service';

@Component({
  selector: 'app-updateproduct',
  standalone: true,
  imports: [NavComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.scss'
})


export class UpdateproductComponent implements OnInit {


  productForm:FormGroup;
  sellerData:any;

  constructor(private route:ActivatedRoute,private fb: FormBuilder) {
    this.productForm=this.fb.group({
     quantity:['',Validators.required],
     price:['',Validators.required]
    });
  }
  service=inject(SellerApiService);

ngOnInit(){
  this.route.queryParams.subscribe(params => {
    const sellerDataString = params['sellerData'];
    if (sellerDataString) {
      this.sellerData = JSON.parse(sellerDataString);
      this.productForm.patchValue({
        productName: this.sellerData.productName,
        availableQuantity: this.sellerData.availableQuantity,
        price: this.sellerData.price,
      });
    }
  });
}
 
onUpdateProduct() {
  if (this.productForm.valid) {
    const productData = this.productForm.value;
    console.log(productData)
    this.service.updateProduct(this.sellerData.sellerProductId, productData).subscribe({
      next:(response:any)=>{
        if(response){
          alert('Products Updated Successfully');
        }

      },
      error: (error) => {
             console.error("Error Updating products:", error);
             alert("An error occurred while Updating products");
          }    
        });


  }
}
}

