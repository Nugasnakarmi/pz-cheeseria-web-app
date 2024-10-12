import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cheese } from '../interfaces/cheese.interface';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CheeseService {
  private apiUrl = `${environment.apiUrl}/cheese`;
  http = inject(HttpClient);
  toastrService = inject(ToastrService);
  getAllCheese$(): Observable<Cheese[]> {
    const getAllCheeseUrl = `${this.apiUrl}/all`;
    return this.http.get<Cheese[]>(getAllCheeseUrl).pipe(
      catchError((error) => {
        // this.toastrService.error('Could not fetch cheese from API', error);
        return of([]);
      })
    );
  }

  getCheeseById(id: number): Observable<Cheese> {
    return this.http.get<Cheese>(`${this.apiUrl}/${id}`);
  }

  addCheese$(cheese: Cheese): Observable<Cheese> {
    const addCheeseUrl = `${this.apiUrl}`;
    return this.http.post<Cheese>(this.apiUrl, cheese);
  }

  updateCheese(id: number, cheese: Cheese): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cheese);
  }

  deleteCheese(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
