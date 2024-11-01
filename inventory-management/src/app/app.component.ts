import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerdashboardComponent } from "./components/seller/sellerdashboard/sellerdashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SellerdashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-management';
}
