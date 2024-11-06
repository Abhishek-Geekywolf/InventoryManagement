import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SellerdashboardComponent } from "./components/seller/sellerdashboard/sellerdashboard.component";
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { TestComponent } from "./test/test.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SellerdashboardComponent, RouterLink, RouterLinkActive, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class AppComponent {
  title = 'inventory-management';
}
