import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customerlogin } from '../../../../models/customerlogin';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SellerApiService } from '../../../../service/sellerapi.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class CLoginComponent implements OnInit {


  customerloginForm: FormGroup;
  service = inject(SellerApiService);
  router=inject(Router)


  constructor(private fb: FormBuilder) {
    this.customerloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.customerloginForm.valid) {
      const customer: customerlogin = this.customerloginForm.value;
      console.log('Form Submitted!', customer);
      this.service.checkcustomer(customer).subscribe({
        next:(response:any)=>
          {
            if(response!=0){
              alert("customerfound")
              localStorage.setItem('custId',response)
              this.router.navigate(['/customer-dash']);
            }
            else{
              alert("customernotfound")
            }
          }
      })
    } else {
      console.log('Form is invalid');
    }

  }

}