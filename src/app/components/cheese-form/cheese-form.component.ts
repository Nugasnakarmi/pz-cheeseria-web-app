import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CheeseService } from '../../services/cheese.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheese-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cheese-form.component.html',
  styleUrl: './cheese-form.component.scss',
})
export class CheeseFormComponent implements OnInit {
  cheeseService = inject(CheeseService);
  toastrService = inject(ToastrService);
  router = inject(Router);

  cheeseForm: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit() {
    this.cheeseForm = new FormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      imageUrl: new UntypedFormControl(''),
      pricePerKilo: new UntypedFormControl('', [Validators.required]),
      color: new UntypedFormControl('', [Validators.required]),
    });
  }

  onAddClick(): void {
    /** With more time, instead of accessing the http service from the component I would have used ngRx store and
    dispatched an 'action' to add cheese here, which in turn would have an 'effect' of adding cheese to the API. **/
    this.cheeseService
      .addCheese$(this.cheeseForm.value)
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

    console.log(this.cheeseForm.value);
  }

  toasterSuccessClickedHandler(): void {
    this.router.navigate(['/cheese-shop']);
  }
}
