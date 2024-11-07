import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sellerlogin } from '../../../../models/sellerlogin';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerApiService } from '../../../../service/sellerapi.service';

@Component({
  selector: 'app-slogin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class SLoginComponent implements OnInit {


  sellerloginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sellerloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {

  }
  service = inject(SellerApiService);
  public router = inject(Router);


  onSubmit() {
    if (!this.sellerloginForm.valid) {
      console.log('Form is invalid');
      return
    }

    const seller: sellerlogin = this.sellerloginForm.value;
    console.log('Form Submitted!', seller);
    const response = this.service.checkseller(seller);
    response.subscribe(
      {
        next: (response: any) => {
          if (response != 0) {
            alert(response)
            localStorage.setItem('sellerId', response)
            this.router.navigate(['/dash']);
          }
          else {
            alert("sellernotfound")

          }

        }
      })

  }

}

