import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sellerlogin } from '../../../../models/sellerlogin';
import { CommonModule } from '@angular/common';
import { SellerApiService } from '../../../../service/sellerapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ssignup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SSignupComponent implements OnInit {

  sellerloginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sellerloginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{1,10}$/)]],
      password: ['', [Validators.required]]
    });
  }

  service = inject(SellerApiService);
  toaster = inject(ToastrService);
  router = inject(Router)

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.sellerloginForm.valid) {
      const seller: sellerlogin = this.sellerloginForm.value;
      console.log('Form Submitted!', seller);
      this.service.addSeller(seller).subscribe(
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
            this.toaster.error("Email already exists");
            this.router.navigate(['/seller/signup']);
    
          }
        });
    } else {
      console.log('Form is invalid');
    }

  }

}
