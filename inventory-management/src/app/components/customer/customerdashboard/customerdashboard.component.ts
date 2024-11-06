import { Component, inject } from '@angular/core';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../customershared/search/search.component";
import { SellerApiService } from '../../../service/sellerapi.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customerdashboard',
  standalone: true,
  imports: [CustomernavComponent, CommonModule, SearchComponent,FormsModule],
  templateUrl: './customerdashboard.component.html',
  styleUrl: './customerdashboard.component.scss'
})
export class CustomerdashboardComponent {


  service=inject(SellerApiService);
  toaster=inject(ToastrService);
  products: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  productsPerPage: number = 6;
  totalProducts: number = 0;
  selectedFilter: any;
  searchQuery: string = '';
  orginalproduct:any[]=[];
  selectedProduct: any = null;  // To store the selected product for the modal
  quantity: number = 1;  

  cart: any[] = [];


    ngOnInit() {
    this.loadProducts();
  }

  loadProducts()
  {
    this.service.customerproduct().subscribe({
      next:(response:any)=>{
        if(response && response.length >0 ){
          this.products=response;
          this.orginalproduct=response;
          this.totalProducts=response.length;
          this.applyFilter();
         // this.updatePaginatedProducts();
        }else{
          alert("No products found");
        }

      },
      error: (error) => {
        console.error("Error fetching products:", error);
        alert("An error occurred while fetching products");
      }

    });
  }



  openAddToCartModal(products:any)
  {
    this.selectedProduct = products;  
    this.quantity = 1; 
  }

  addToCart(): void {
    console.log('Product added to cart:', this.selectedProduct.productName);
    console.log('Quantity:', this.quantity);
    console.log('id:',this.selectedProduct);
    this.service.addToCart(this.selectedProduct, this.quantity);
    
  //   const existingProduct = this.cart.find(item => item.id === this.selectedProduct.id);
  //   console.log('Product added to cart:', this.cart);
  // if (existingProduct) {
  //   // If the product is already in the cart, update the quantity
  //   existingProduct.quantity += this.quantity;
  //   console.log('Updated product in cart:', existingProduct);
  // } else {
  //   // If the product is not in the cart, add it as a new product
  //   const cartProduct = {
  //     productName: this.selectedProduct.productName,
  //     price: this.selectedProduct.price,
  //     quantity: this.quantity,
  //     id: this.selectedProduct.id
  //   };
  //   this.cart.push(cartProduct);
  //   console.log('Product added to cart:', cartProduct);
  // }



    // Optionally, show a success message
  //  this.toaster.success('Product added to cart');
  }


  onSearch(query: string) {
    this.searchQuery = query; // Update the search query
    console.log('search item:',this.searchQuery);
    this.applyFilter(); // Reapply the filter after the search query is updated
  }


  onFilterChange(selectedFilter: any) {
    console.log("Filter object:", selectedFilter); // Log the entire object
    console.log("Selected Filter ID:", selectedFilter.id);  // Log just the 'id' field (the actual filter ID)
    this.selectedFilter = selectedFilter.id;
    this.applyFilter();
  }
  


  // applyFilter() {
  //   console.log("entered applyFilter, selectedFilter:", this.selectedFilter);  // Log the selected filter

  //   let filteredProducts = [...this.products];  // Clone the products array to prevent mutations
  //   // Apply filter based on selected option
  //   switch (this.selectedFilter) {
  //     case 'price-low-to-high':
  //       console.log("Sorting by price-low-to-high");
  //       filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case 'price-high-to-low':
  //       console.log("Sorting by price-high-to-low");
  //       filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     // case 'most-ordered':
  //     //   console.log("Sorting by most-ordered");
  //     //   filteredProducts = filteredProducts.sort((a, b) => b.ordersCount - a.ordersCount);
  //     //   break;
  //     case 'all-products':
  //     default:
  //       console.log("Showing all products");
  //       break;
  //   }

  //   // Log filtered products
  //   console.log("Filtered Products: ", filteredProducts);

  //   // Update the filtered products and reset pagination
  //   this.products = filteredProducts;
  //   this.totalProducts = filteredProducts.length;
  //   this.currentPage = 1;  // Reset to page 1 after applying the filter
  //   this.updatePaginatedProducts();  // Recalculate the paginated products
  // }

  applyFilter() {
    let filteredProducts = [...this.orginalproduct]; // Clone the product array to avoid mutations

    // Apply search query filter
    if (this.searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) // Case-insensitive search
      );
    }

    // Apply the selected filter (e.g., sorting by price)
    switch (this.selectedFilter) {
      case 'price-low-to-high':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'all-products':
      default:
        break; // No sorting if 'all-products' is selected
    }

    // Update the filtered products and reset pagination
    this.products = filteredProducts;
    this.totalProducts = filteredProducts.length;
    this.currentPage = 1;  // Reset to page 1 after applying the filter
    this.updatePaginatedProducts();  // Recalculate the paginated products
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
