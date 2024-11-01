import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgSelectModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  options = [
    { id: 'all', name: 'All Products' },
    { id: 'price-low to high', name: 'price-low to high' },
    { id: 'price-high to low', name: 'price-high to low' },
    { id: 'Most Ordered', name: 'Most Ordered' }
  ];
}
