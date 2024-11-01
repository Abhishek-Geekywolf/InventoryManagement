import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SellerdashboardComponent } from "./components/seller/sellerdashboard/sellerdashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SellerdashboardComponent,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-management';
}
