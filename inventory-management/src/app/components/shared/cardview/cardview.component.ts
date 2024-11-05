import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SellerApiService } from '../../../service/sellerapi.service';

@Component({
  selector: 'app-cardview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardview.component.html',
  styleUrl: './cardview.component.scss'
})
export class CardviewComponent {

 
  service = inject(SellerApiService);
  products: any[] = [];

  ngOnInit() {
    this.loadProducts(); 
  }

  loadProducts() {
    const sellerid = this.service.sellerid; 
    this.service.sellerproduct(sellerid).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.products = response; // Store the response in the products array
        } else {
          alert("No products found");
        }
      },
      error: (error) => {
        console.error("Error fetching products:", error);
        alert("An error occurred while fetching products");
      }
    });
  }
}




