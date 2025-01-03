import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customerlogin } from '../../../../models/customerlogin';
import { CommonModule } from '@angular/common';
import { SellerApiService } from '../../../../service/sellerapi.service';
<<<<<<< HEAD

=======
>>>>>>> 4be5300779f884fc4a763ea38520fd8373115a69
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class CSignupComponent implements OnInit {
  customerloginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerloginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{1,10}$/)]],
      password: ['', Validators.required]
    });
  }

  service = inject(SellerApiService);
  router = inject(Router)
  ngOnInit(): void {

  }


<<<<<<< HEAD
  //router=inject(Router)
=======
>>>>>>> 4be5300779f884fc4a763ea38520fd8373115a69
  toaster=inject(ToastrService);
  
  onSubmit()
  {
    if(this.customerloginForm.valid)
      {
        const customer: customerlogin = this.customerloginForm.value; 
        console.log('Form Submitted!', customer);
        this.service.AddCustomer(customer).subscribe({

          next:(response:any)=>{
            if(response!=0){
             alert("customer inserted")
             this.toaster.success("customer added","success");
             this.router.navigate(['/customer/login']);
        
            }},
            error: (error) => {
              console.error("Error fetching products:", error);
              alert("Email already exists");
              this.toaster.error("Email already exists");
              this.router.navigate(['/customer/signup']);
            }
          });
      } else {
        console.log('Form is invalid');
      }

  }

}
