import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SellerApiService } from '../../../service/sellerapi.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgSelectModule,RouterLink,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
service=inject(SellerApiService);
  searchProduct:string='';

  @Output() searchname=new EventEmitter<string>();
  
  
  options = [
    { id: 'all', name: 'All Products' },
    { id: 'available', name: 'Available Only' },
    { id: 'out-of-stock', name: 'Out of Stock' }
  ];

search(name:string):void{
this.searchname.emit(name);
}

}
