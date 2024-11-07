import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customerlogin } from '../../../../models/customerlogin';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private fb: FormBuilder) {
    this.customerloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  service = inject(SellerApiService);

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.customerloginForm.valid) {
      const customer: customerlogin = this.customerloginForm.value;
      console.log('Form Submitted!', customer);
      this.service.checkcustomer(customer)
    } else {
      console.log('Form is invalid');
    }

  }

}