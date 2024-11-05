import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sellerlogin } from '../../../../models/sellerlogin';
import { CommonModule } from '@angular/common';
import { SellerApiService } from '../../../../service/sellerapi.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SSignupComponent implements OnInit {

  sellerloginForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.sellerloginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern(/^\d{1,10}$/)]],
      password:['',[Validators.required]]
    });
  }

service=inject(SellerApiService);

  ngOnInit(): void {
    
  }

  onSubmit()
  {
    if(this.sellerloginForm.valid)
      {
        const seller: sellerlogin = this.sellerloginForm.value; 
        console.log('Form Submitted!', seller);
        this.service.addSeller(seller);
      } else {
        console.log('Form is invalid');
      }

  }

}
