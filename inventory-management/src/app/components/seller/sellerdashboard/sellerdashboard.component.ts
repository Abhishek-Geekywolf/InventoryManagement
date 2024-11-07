import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavComponent } from "../../shared/nav/nav.component";
import { SearchComponent } from "../../shared/search/search.component";
import { CardviewComponent } from "../../shared/cardview/cardview.component";

@Component({
  selector: 'app-sellerdashboard',
  standalone: true,
  imports: [NgSelectModule, CommonModule, NavComponent, SearchComponent, CardviewComponent],
  templateUrl: './sellerdashboard.component.html',
  styleUrl: './sellerdashboard.component.scss'
})
export class SellerdashboardComponent {

  searchQuery: string = ''; 
  selectedFilter: string = 'all';

  onSearchChanged(query: string): void {
    this.searchQuery = query;  
  }

  onFilterChanged(filter: string): void {
    this.selectedFilter = filter;
  }

}
