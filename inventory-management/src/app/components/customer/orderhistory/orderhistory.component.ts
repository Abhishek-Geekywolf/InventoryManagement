import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SellerApiService } from '../../../service/sellerapi.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavComponent } from "../../shared/nav/nav.component";
import { SearchComponent } from "../customershared/search/search.component";
import { CustomernavComponent } from "../customershared/customernav/customernav.component";

@Component({
  selector: 'app-orderhistory',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, NavComponent, SearchComponent, CustomernavComponent],
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrderhistoryComponent {
  products: any[] = [];
  orders: any[] = [];
  selectedProductName: string = '';
  selectedSellerId: number = 1;
  dataSource: any;
  columnsToDisplay: string[] = ['orderId', 'orderDate', 'totalPrice', 'innerTable'];
  innerToDisplay: string[] = ['productName', 'quantity', 'subTotalPrice'];
  service = inject(SellerApiService)
  constructor(private cdr: ChangeDetectorRef) { }
  custid = Number(localStorage.getItem('custId'))


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getCustomerOrderHistory(this.custid).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.orders = response;
          console.log(this.orders);
          this.dataSource = new MatTableDataSource(this.orders);
        } else {
          alert('No orders found');
        }
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert('An error occurred while fetching orders');
      }
    });
  }

  toggle(order: any) {
    order.showDetails = !order.showDetails;
    console.log(order.showDetails)
    console.log('order details', order.orderDetails)
    this.cdr.detectChanges();
    console.log('Change detection triggered');


  }
}
