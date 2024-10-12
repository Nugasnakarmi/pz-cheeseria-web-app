import { Component, inject, Input, OnInit } from '@angular/core';
import { CheeseFormComponent } from '../cheese-form/cheese-form.component';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { Cheese } from '../../interfaces/cheese.interface';
import { CheeseService } from '../../services/cheese.service';
import { catchError, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'cheese-update',
  standalone: true,
  imports: [CheeseFormComponent, CheeseItemComponent],
  templateUrl: './cheese-update.component.html',
  styleUrl: './cheese-update.component.scss',
})
export class CheeseUpdateComponent implements OnInit {
  cheeseService = inject(CheeseService);
  route = inject(ActivatedRoute);
  toastRService = inject(ToastrService);
  @Input() cheese: Cheese = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerKilo: 0,
    color: '',
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cheeseId = params['id'];

      this.cheeseService
        .getCheeseById$(cheeseId)
        .pipe(
          tap((fetchedCheese) => {
            this.cheese = fetchedCheese;
          }),
          catchError((error) => {
            this.toastRService.error((error as Error).message, 'Error');
            return of(error);
          })
        )
        .subscribe();
    });
  }
}
