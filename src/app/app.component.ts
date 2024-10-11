import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheeseFormComponent } from './components/cheese-form/cheese-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheeseFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pz-cheeseria-web-app';
}
