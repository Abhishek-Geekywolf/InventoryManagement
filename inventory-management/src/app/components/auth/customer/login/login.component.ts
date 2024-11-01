import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customerlogin } from '../../../../models/customerlogin';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class CLoginComponent implements OnInit{


  customerloginForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerloginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern(/^\d{1,10}$/)]],
    });
  }


  ngOnInit(): void {
    
  }

  onSubmit()
  {
    if(this.customerloginForm.valid)
      {
        const customer: customerlogin = this.customerloginForm.value; // Create a product object
        console.log('Form Submitted!', customer);
        // Here you can handle the form data, e.g., send it to a server
      } else {
        console.log('Form is invalid');
      }

  }

}
