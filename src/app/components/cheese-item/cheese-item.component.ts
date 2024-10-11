import { Component, Input } from '@angular/core';
import { Cheese } from '../../interfaces/cheese.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cheese-item',
  standalone: true,
  imports: [],
  templateUrl: './cheese-item.component.html',
  styleUrl: './cheese-item.component.scss',
  providers: [CurrencyPipe],
})
export class CheeseItemComponent {
  stockImageAddress = 'assets/images/stock.jpg';
  @Input() cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };

  ngOnInit() {
    this.setStockCheeseImageIfNotProvided();
  }

  setStockCheeseImageIfNotProvided(): void {
    if (!this.cheese.imageUrl) {
      this.cheese.imageUrl = this.stockImageAddress;
    }
  }
}
