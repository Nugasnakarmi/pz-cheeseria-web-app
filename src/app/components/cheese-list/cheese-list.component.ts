import { Component } from '@angular/core';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { Cheese } from '../../interfaces/cheese.interface';

@Component({
  selector: 'app-cheese-list',
  standalone: true,
  imports: [CheeseItemComponent],
  templateUrl: './cheese-list.component.html',
  styleUrl: './cheese-list.component.scss',
})
export class CheeseListComponent {
  cheeseList: Cheese[] = [
    {
      id: 0,
      name: 'Camembert',
      imageUrl:
        'https://www.cheese.com/media/img/cheese-suggestion/manchego_1280x800_1.jpg',
      pricePerKilo: 3.5,
      color: 'beige',
    },
    {
      id: 1,
      name: 'Cheddar',
      imageUrl:
        'https://www.cheese.com/media/img/cheese-suggestion/manchego_1280x800_1.jpg',
      pricePerKilo: 3.5,
      color: 'red',
    },
    {
      id: 2,
      name: 'Mozzarella',
      imageUrl:
        'https://www.cheese.com/media/img/cheese-suggestion/manchego_1280x800_1.jpg',
      pricePerKilo: 3.5,
      color: 'white',
    },
    {
      id: 3,
      name: 'Gouda',
      imageUrl:
        'https://www.cheese.com/media/img/cheese-suggestion/manchego_1280x800_1.jpg',
      pricePerKilo: 3.5,
      color: 'beige',
    },
    {
      id: 4,
      name: 'Gruyere',
      imageUrl:
        'https://www.cheese.com/media/img/cheese-suggestion/manchego_1280x800_1.jpg',
      pricePerKilo: 3.5,
      color: 'white',
    },
  ];
}
