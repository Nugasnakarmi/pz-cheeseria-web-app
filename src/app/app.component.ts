import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CheeseFormComponent } from './components/cheese-form/cheese-form.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheeseFormComponent, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pz-cheeseria-web-app';
  route = inject(ActivatedRoute); // Injecting this way instead of using constructor to reduce boilerplate
}
