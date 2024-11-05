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
  paginatedProducts: any[] = [];  
  currentPage: number = 1;
  productsPerPage: number = 6;
  totalProducts: number = 0;

  ngOnInit() {
    this.loadProducts(); 
  }

  loadProducts() {
    const sellerid = this.service.sellerid; 
    this.service.sellerproduct(sellerid).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.products = response; // Store the response in the products array
          this.totalProducts=response.length;
          this.updatePaginatedProducts();
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

  updatePaginatedProducts()
  {
    const startIndex=(this.currentPage-1)*this.productsPerPage;
    const endIndex=startIndex+this.productsPerPage;
    this.paginatedProducts=this.products.slice(startIndex,endIndex);
  }

  nextPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage * this.productsPerPage < this.totalProducts) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  goToPage(event: Event,page: number): void {
    event.preventDefault();
    if (page > 0 && page <= Math.ceil(this.totalProducts / this.productsPerPage)) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

}




