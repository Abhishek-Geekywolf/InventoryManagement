import { Component } from '@angular/core';
import { CustomernavComponent } from "../customershared/customernav/customernav.component";
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../customershared/search/search.component";

@Component({
  selector: 'app-customerdashboard',
  standalone: true,
  imports: [CustomernavComponent, CommonModule, SearchComponent],
  templateUrl: './customerdashboard.component.html',
  styleUrl: './customerdashboard.component.scss'
})
export class CustomerdashboardComponent {

  products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
    { id: 4, name: 'Product 4', price: 49.99 },
    { id: 5, name: 'Product 5', price: 59.99 },
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
    { id: 4, name: 'Product 4', price: 49.99 },
    { id: 5, name: 'Product 5', price: 59.99 },
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
    { id: 4, name: 'Product 4', price: 49.99 },
    { id: 5, name: 'Product 5', price: 59.99 },
  ];
}
