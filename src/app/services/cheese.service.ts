import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cheese } from '../interfaces/cheese.interface';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CheeseService {
  private apiUrl = `${environment.apiUrl}/cheese`;
  http = inject(HttpClient);
  toastrService = inject(ToastrService);

  // The showErrorInToast should be moved into a helper/utility file.
  showErrorInToast(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error) {
      this.toastrService.error((error as Error).message, 'Error');
    }
    return of(error);
  }
  getAllCheese$(): Observable<Cheese[]> {
    const getAllCheeseUrl = `${this.apiUrl}/all`;
    return this.http.get<Cheese[]>(getAllCheeseUrl).pipe(
      catchError((error) => {
        // this.toastrService.error('Could not fetch cheese from API', error);
        return of([]);
      })
    );
  }

  getCheeseById$(id: number): Observable<Cheese> {
    return this.http.get<Cheese>(`${this.apiUrl}/${id}`);
  }

  addCheese$(cheese: Cheese): Observable<Cheese> {
    const addCheeseUrl = `${this.apiUrl}`;
    return this.http.post<Cheese>(this.apiUrl, cheese);
  }

  updateCheese$(
    id: number,
    cheese: Cheese
  ): Observable<void | HttpErrorResponse> {
    return this.http
      .put<void | HttpErrorResponse>(`${this.apiUrl}/${id}`, cheese)
      .pipe(
        tap(() => {
          this.toastrService.success('Cheese updated successfully', 'Success');
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
}
