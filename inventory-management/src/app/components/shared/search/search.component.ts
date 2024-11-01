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
    { id: 'available', name: 'Available Only' },
    { id: 'out-of-stock', name: 'Out of Stock' }
  ];

}
