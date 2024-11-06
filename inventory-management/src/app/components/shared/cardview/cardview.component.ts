import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { SellerApiService } from '../../../service/sellerapi.service';
import { Product } from '../../../models/products';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardview',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './cardview.component.html',
  styleUrl: './cardview.component.scss'
})
export class CardviewComponent {

  router=inject(Router)
 
  service = inject(SellerApiService);
  products: any[]=[];
  sellerData: any; 
  sellerproductid:number=0;
  filteredProducts: Product[] = [];
  paginatedProducts: any[] = [];  
  currentPage: number = 1;
  productsPerPage: number = 6;
  totalProducts: number = 0;

  previousSearchQuery: string = '';

  @Input() searchQuery: string = '';
  // selectedFilter: string = 'all';
  @Input() selectedFilter: string = 'all';

  // ngOnChanges(changes: SimpleChanges): void {
  //   // Check if the search query has changed and filter products accordingly
  //   if (changes['searchQuery']) {
  //     this.filterProducts();
  //     //this.updatePaginatedProducts();
  //   }
  // }

  ngOnInit() {
    this.loadProducts(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      // When searchQuery changes, apply filter
      this.filterProducts();
    }

    if (changes['selectedFilter']) {
      this.filterProducts();  // Re-filter products when filter changes
    }
  }



  setProducts(product: any) {
    this.sellerData = { 
      sellerProductId: product.sellerProductId,
      productName: product.productName,
      availableQuantity: product.availableQuantity,
      price: product.price
    };}

    rout(){
    this.router.navigate(['/update-products'], { queryParams: { sellerData: JSON.stringify(this.sellerData) } });
    }

  update(id:number){
  this.sellerproductid=id;
  }







  loadProducts() {
    const sellerid = this.service.sellerid; 
    this.service.sellerproduct(sellerid).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.products = response; 
          this.filteredProducts = response;
         
          this.totalProducts=response.length;
          //this.filterProducts();
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

  // filterProducts(): void {
  //   console.log("inside filter")
  //   if (this.searchQuery) {
  //     this.filteredProducts = this.products.filter(product =>
  //       product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   } else {
  //     this.filteredProducts = this.products; // If no search query, show all products
  //   }
  //   this.totalProducts = this.filteredProducts.length;
  //   this.currentPage = 1; // Reset to the first page after search
  //   this.updatePaginatedProducts(); // Update paginated products after filtering
  // }

  filterProducts(): void {
    let filtered = this.products;

    // Filter by search query if available
    if (this.searchQuery) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply additional filter based on the selected filter
    if (this.selectedFilter === 'available') {
      filtered = filtered.filter(product => product.availableQuantity > 0); // Available only
    } else if (this.selectedFilter === 'out-of-stock') {
      filtered = filtered.filter(product => product.availableQuantity === 0); // Out of stock
    } else if (this.selectedFilter === 'low-stock') {
      filtered = filtered.filter(product => product.availableQuantity > 0 && product.availableQuantity <= 5); // Low stock (1 to 5)
    }

    this.filteredProducts = filtered;
    this.totalProducts = filtered.length;
    this.currentPage = 1; // Reset to the first page after applying the filter
    this.updatePaginatedProducts(); // Update paginated products after filtering
  }

  updatePaginatedProducts()
  {
    const startIndex=(this.currentPage-1)*this.productsPerPage;
    const endIndex=startIndex+this.productsPerPage;
    this.paginatedProducts=this.filteredProducts.slice(startIndex,endIndex);
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




