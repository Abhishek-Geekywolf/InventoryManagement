import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sellerlogin } from '../../../../models/sellerlogin';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerApiService } from '../../../../service/sellerapi.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class SLoginComponent implements OnInit{


  sellerloginForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.sellerloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }


  ngOnInit(): void {
    
  }
  service=inject(SellerApiService);

  onSubmit()
  {
    if(this.sellerloginForm.valid)
      {
        const seller: sellerlogin = this.sellerloginForm.value; // Create a product object
        console.log('Form Submitted!', seller);
        this.service.checkseller(seller);
        // Here you can handle the form data, e.g., send it to a server
      } else {
        console.log('Form is invalid');
      }

  }

}
