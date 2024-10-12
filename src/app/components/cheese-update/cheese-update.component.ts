import { Component, inject, Input, OnInit } from '@angular/core';
import { CheeseFormComponent } from '../cheese-form/cheese-form.component';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { Cheese } from '../../interfaces/cheese.interface';
import { CheeseService } from '../../services/cheese.service';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'cheese-update',
  standalone: true,
  imports: [CheeseFormComponent, CheeseItemComponent, CommonModule],
  templateUrl: './cheese-update.component.html',
  styleUrl: './cheese-update.component.scss',
})
export class CheeseUpdateComponent implements OnInit {
  cheeseService = inject(CheeseService);
  route = inject(ActivatedRoute);
  toastrService = inject(ToastrService);
  @Input() cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };

  cheese$: Observable<Cheese> = new Observable<Cheese>();
  subscriptions: Subscription = new Subscription();
  cheeseId = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cheeseId = params['id'];
      //The async pipe in the template automatically closes this subscription.
      this.cheese$ = this.cheeseService.getCheeseById$(this.cheeseId).pipe(
        tap((fetchedCheese) => {
          this.cheese = fetchedCheese;
        }),
        catchError((error) => {
          if (error) {
            this.toastrService.error((error as Error).message, 'Error');
          }
          return of(error);
        })
      );
    });
  }

  ngOnDestroy(): void {
    //To ensure all subscriptions in this component are unsubscribed when component is destroyed to prevent memory leaks.
    this.subscriptions.unsubscribe();
  }

  onCheeseUpdate(cheese: Cheese): void {
    this.subscriptions.add(
      this.cheeseService.updateCheese$(this.cheeseId, cheese).subscribe()
    );
  }
}
