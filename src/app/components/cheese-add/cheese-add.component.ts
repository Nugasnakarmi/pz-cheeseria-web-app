import { Component, inject } from '@angular/core';
import { CheeseFormComponent } from '../cheese-form/cheese-form.component';

import { CheeseService } from '../../services/cheese.service';
import { ToastrService } from 'ngx-toastr';
import { Cheese } from '../../interfaces/cheese.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cheese-add',
  standalone: true,
  imports: [CheeseFormComponent],
  templateUrl: './cheese-add.component.html',
  styleUrl: './cheese-add.component.scss',
})
export class CheeseAddComponent {
  cheeseService = inject(CheeseService);
  subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  onCheeseAdded($event: Cheese): void {
    const cheese = $event;
    /** With more time, instead of accessing the http service from the component I would have used ngRx store and
    dispatched an 'action' to add cheese here, which in turn would have an 'effect' of adding cheese to the API. **/

    this.subscriptions.add(this.cheeseService.addCheese$(cheese).subscribe());
  }
}
