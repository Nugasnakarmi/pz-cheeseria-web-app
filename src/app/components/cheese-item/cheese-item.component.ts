import { Component, Input } from '@angular/core';
import { Cheese } from '../../interfaces/cheese.interface';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'cheese-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './cheese-item.component.html',
  styleUrl: './cheese-item.component.scss',
  providers: [CurrencyPipe],
})
export class CheeseItemComponent {
  stockImageAddress = 'assets/images/stock.jpg';
  faTrashCan = 'fa-trash-can';
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
