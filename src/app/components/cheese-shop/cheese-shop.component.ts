import { Component } from '@angular/core';
import { CheeseListComponent } from '../cheese-list/cheese-list.component';
import { CheeseFormComponent } from '../cheese-form/cheese-form.component';

@Component({
  selector: 'app-cheese-shop',
  standalone: true,
  imports: [CheeseListComponent, CheeseFormComponent],
  templateUrl: './cheese-shop.component.html',
  styleUrl: './cheese-shop.component.scss',
})
export class CheeseShopComponent {}
