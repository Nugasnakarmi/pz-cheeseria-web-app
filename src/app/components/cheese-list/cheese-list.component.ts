import { Component } from '@angular/core';
import { CheeseItemComponent } from "../cheese-item/cheese-item.component";

@Component({
  selector: 'app-cheese-list',
  standalone: true,
  imports: [CheeseItemComponent],
  templateUrl: './cheese-list.component.html',
  styleUrl: './cheese-list.component.scss'
})
export class CheeseListComponent {

}
