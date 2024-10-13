import { Component, inject, OnInit } from '@angular/core';
import { CheeseService } from '../../services/cheese.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { Cheese } from '../../interfaces/cheese.interface';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-price-calculation',
  standalone: true,
  imports: [CheeseItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './price-calculation.component.html',
  styleUrl: './price-calculation.component.scss',
})
export class PriceCalculationComponent implements OnInit {
  cheeseService = inject(CheeseService);
  route = inject(ActivatedRoute);
  cheese$: Observable<Cheese> = new Observable<Cheese>();
  subscriptions: Subscription = new Subscription();
  cheeseId = 0;
  toastrService: any;
  cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };
  totalPrice: number = 0;
  priceForm: UntypedFormGroup = new UntypedFormGroup({});
  ngOnInit(): void {
    this.initializePriceForm();
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

  initializePriceForm(): void {
    this.priceForm = new UntypedFormGroup({
      weight: new UntypedFormControl(0, [Validators.required]),
    });
  }
  onWeightChange(): void {
    this.calculatePrice();
  }
  calculatePrice(): void {
    this.totalPrice =
      this.cheese.pricePerKilo * this.priceForm.get('weight')?.value;
  }
}
