import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Output() filterChanged = new EventEmitter<object>();
  @Output() searchChanged = new EventEmitter<string>();

  options = [
    { id: 'all-products', name: 'all-products' },
    { id: 'price-low-to-high', name: 'price-low-to-high' },
    { id: 'price-high-to-low', name: 'price-high-to-low' },
  ];

  searchQuery: string = '';
  onSearch() {
    this.searchChanged.emit(this.searchQuery); 
  }


  onFilterChange(selectedFilter: object): void {
    this.filterChanged.emit(selectedFilter);  
  }
}
