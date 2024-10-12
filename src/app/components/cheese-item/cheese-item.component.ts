import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cheese } from '../../interfaces/cheese.interface';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface CheeseAction {
  action: string;
}
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
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  @Input() cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };
  @Input() mode: 'shop' | 'update' = 'shop';

  @Output() cheeseActionClicked = new EventEmitter<'update' | 'delete'>();

  ngOnInit() {
    this.setStockCheeseImageIfNotProvided();
  }

  setStockCheeseImageIfNotProvided(): void {
    if (!this.cheese.imageUrl) {
      this.cheese.imageUrl = this.stockImageAddress;
    }
  }

  onCheeseActionClick(action: 'update' | 'delete'): void {
    this.cheeseActionClicked.emit(action);
  }
}
