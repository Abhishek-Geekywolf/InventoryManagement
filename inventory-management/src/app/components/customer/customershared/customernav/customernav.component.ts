import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-customernav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './customernav.component.html',
  styleUrl: './customernav.component.scss'
})
export class CustomernavComponent {

}
