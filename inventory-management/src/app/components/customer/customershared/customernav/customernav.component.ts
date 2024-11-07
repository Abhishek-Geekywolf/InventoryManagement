import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-customernav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './customernav.component.html',
  styleUrl: './customernav.component.scss'
})
export class CustomernavComponent {
  route = inject(Router)
  logout() {
    localStorage.setItem('custId', '');
    this.route.navigate(['/roleselection']);
  }

}
