import { Component, inject } from '@angular/core';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../customershared/search/search.component";
import { SellerApiService } from '../../../service/sellerapi.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customerdashboard',
  standalone: true,
  imports: [CustomernavComponent, CommonModule, SearchComponent, FormsModule, RouterLink],
  templateUrl: './customerdashboard.component.html',
  styleUrl: './customerdashboard.component.scss'
})
export class CustomerdashboardComponent {


  service = inject(SellerApiService);
  toaster = inject(ToastrService);
  products: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  productsPerPage: number = 6;
  totalProducts: number = 0;
  selectedFilter: any;
  searchQuery: string = '';
  orginalproduct: any[] = [];
  selectedProduct: any = null;
  quantity: number = 1;
  route = inject(Router)

  cart: any[] = [];


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.customerproduct().subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.products = response;
          this.orginalproduct = response;
          this.totalProducts = response.length;
          this.applyFilter();
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



  openAddToCartModal(products: any) {
    this.selectedProduct = products;
    this.quantity = 1;

  }


  addToCart(): void {
    console.log('Product added to cart:', this.selectedProduct.productName);
    console.log('Quantity:', this.quantity);
    console.log('id:', this.selectedProduct);
    this.service.addToCart(this.selectedProduct, this.quantity);
  }


  onSearch(query: string) {
    this.searchQuery = query;
    console.log('search item:', this.searchQuery);
    this.applyFilter();
  }


  onFilterChange(selectedFilter: any) {
    console.log("Filter object:", selectedFilter);
    console.log("Selected Filter ID:", selectedFilter.id);
    this.selectedFilter = selectedFilter.id;
    this.applyFilter();
  }





  applyFilter() {
    let filteredProducts = [...this.orginalproduct];

    if (this.searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    switch (this.selectedFilter) {
      case 'price-low-to-high':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'all-products':
      default:
        break;
    }

    this.products = filteredProducts;
    this.totalProducts = filteredProducts.length;
    this.currentPage = 1;
    this.updatePaginatedProducts();
  }




  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
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

  goToPage(event: Event, page: number): void {
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
