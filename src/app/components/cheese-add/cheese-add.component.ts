import { Component, inject } from '@angular/core';
import { CheeseFormComponent } from '../cheese-form/cheese-form.component';
import { catchError, EMPTY, of, take, tap } from 'rxjs';
import { CheeseService } from '../../services/cheese.service';
import { ToastrService } from 'ngx-toastr';
import { Cheese } from '../../interfaces/cheese.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheese-add',
  standalone: true,
  imports: [CheeseFormComponent],
  templateUrl: './cheese-add.component.html',
  styleUrl: './cheese-add.component.scss',
})
export class CheeseAddComponent {
  cheeseService = inject(CheeseService);
  toastrService = inject(ToastrService);
  router = inject(Router);
  onCheeseAdded($event: Cheese): void {
    const cheese = $event;
    /** With more time, instead of accessing the http service from the component I would have used ngRx store and
    dispatched an 'action' to add cheese here, which in turn would have an 'effect' of adding cheese to the API. **/
    this.cheeseService
      .addCheese$(cheese)
      .pipe(
        tap((res) => {
          console.log(res);
          this.toastrService
            .success(
              'Cheese added successfully! Click to heading back to the shop with updated cheese list',
              'Success'
            )
            .onTap.pipe(take(1))
            .subscribe(() => this.toasterSuccessClickedHandler());
        }),
        catchError((error) => {
          this.toastrService.error('Could not add cheese to API', error);
          return of(EMPTY);
        })
      )
      .subscribe();

    console.log($event);
  }

  toasterSuccessClickedHandler(): void {
    this.router.navigate(['/cheese-shop']);
  }
}
