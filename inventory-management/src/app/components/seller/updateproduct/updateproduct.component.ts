import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/products';
import { CommonModule } from '@angular/common';
import { SellerApiService } from '../../../service/sellerapi.service';

@Component({
  selector: 'app-updateproduct',
  standalone: true,
  imports: [NavComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.scss'
})


export class UpdateproductComponent implements OnInit {

  router=inject(Router)
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
          this.router.navigate(['/dash']); 
        }

      },
      error: (error) => {
             console.error("Error Updating products:", error);
             alert("An error occurred while Updating products");
          }    
        });


  }
}

 
onDeleteProduct() {
  const deleteData = {
    quantity: -this.sellerData.availableQuantity, 
    price: this.sellerData.price, 
  };
  // Call the update product API to set quantity to 0
  console.log(deleteData)
  this.service.updateProduct(this.sellerData.sellerProductId, deleteData).subscribe({
    next: (response: any) => {
      if (response) {
        alert('Product Quantity Set to 0');
        this.router.navigate(['/dash']);
      }
    },
    error: (error) => {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product");
    }
  });
}

}

