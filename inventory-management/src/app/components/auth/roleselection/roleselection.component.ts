import { PlatformLocation } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-roleselection',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './roleselection.component.html',
  styleUrl: './roleselection.component.scss'
})
export class RoleselectionComponent {
  PlatformLocation = inject(PlatformLocation)

  constructor() {
    history.pushState(null, '', location.href);
    this.PlatformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });


  }
}
