import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SellerApiService } from '../../../service/sellerapi.service';
import { idText } from 'typescript';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgSelectModule,RouterLink,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
service=inject(SellerApiService);
  
  @Output() searchChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<string>(); 
  
  options = [
    { id: 'all', name: 'All Products' },
    { id: 'available', name: 'Available Only' },
    { id: 'out-of-stock', name: 'Out of Stock' },
    { id: 'low-stock', name: 'Low Stock' },
  ];

  searchQuery: string = ''; 
  selectedFilter: string = 'all';
  onSearch() {
    this.searchChanged.emit(this.searchQuery); 
  }


  onFilterChange() {
    this.filterChanged.emit(this.selectedFilter); 
  }


}
