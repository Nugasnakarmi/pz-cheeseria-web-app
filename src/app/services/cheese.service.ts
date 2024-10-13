import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cheese } from '../interfaces/cheese.interface';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheeseService {
  public apiUrl = `${environment.apiUrl}/cheese`;
  http = inject(HttpClient);
  toastrService = inject(ToastrService);
  router = inject(Router);
  //TO DO: Move the showErrorInToast into a helper/utility file.
  showErrorInToast(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error) {
      this.toastrService.error((error as Error).message, 'Error');
    }
    return of(error);
  }

  getAllCheese$(): Observable<Cheese[]> {
    const getAllCheeseUrl = `${this.apiUrl}/all`;
    return this.http.get<Cheese[]>(getAllCheeseUrl).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getCheeseById$(id: number): Observable<Cheese> {
    return this.http.get<Cheese>(`${this.apiUrl}/${id}`);
  }

  addCheese$(cheese: Cheese): Observable<Cheese | HttpErrorResponse> {
    return this.http.post<Cheese>(this.apiUrl, cheese).pipe(
      tap(() => {
        this.toastrService
          .success(
            'Cheese added successfully! Going back to the shop with updated cheese list',
            'Success',
            { timeOut: 1000 }
          )
          .onHidden.pipe(take(1))
          .subscribe(() => this.toasterAfterSuccessHandler());
      }),
      catchError((error) => this.showErrorInToast(error))
    );
  }

  updateCheese$(
    id: number,
    cheese: Cheese
  ): Observable<void | HttpErrorResponse> {
    return this.http
      .put<void | HttpErrorResponse>(`${this.apiUrl}/${id}`, cheese)
      .pipe(
        tap((res) => {
          console.log(res);
          this.toastrService
            .success(
              'Cheese updated successfully! Going back to the shop with updated cheese list',
              'Success',
              { timeOut: 1000 }
            )
            .onHidden.pipe(take(1))
            .subscribe(() => this.toasterAfterSuccessHandler());
        }),

        catchError((error) => this.showErrorInToast(error))
      );
  }

  deleteCheese$(id: number): Observable<boolean | HttpErrorResponse> {
    return this.http
      .delete<boolean | HttpErrorResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          this.toastrService.success('Cheese deleted successfully', 'Success');
        }),
        catchError((error) => this.showErrorInToast(error))
      );
  }

  toasterAfterSuccessHandler(): void {
    this.router.navigate(['/cheese-shop']);
  }
}
