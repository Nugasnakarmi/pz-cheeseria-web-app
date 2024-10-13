import { Component, inject, OnInit } from '@angular/core';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { Cheese } from '../../interfaces/cheese.interface';
import { CheeseService } from '../../services/cheese.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cheese-list',
  standalone: true,
  imports: [CheeseItemComponent, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './cheese-list.component.html',
  styleUrl: './cheese-list.component.scss',
  providers: [],
})
export class CheeseListComponent implements OnInit {
  cheeseService = inject(CheeseService);
  router = inject(Router);

  cheeseList: Cheese[] = [];
  cheeseList$: Observable<Cheese[]> = new Observable<Cheese[]>();
  faAddIcon = faPlus;
  ngOnInit(): void {
    this.cheeseList$ = this.cheeseService.getAllCheese$();
  }

  onCheeseClick(action: string, cheese: Cheese): void {
    if (action === 'update') {
      this.router.navigate([`/cheese-update/${cheese.id}`]);
    }
    if (action === 'delete') {
      this.cheeseService
        .deleteCheese$(cheese.id)
        .pipe(
          tap(() => {
            this.cheeseList$ = this.cheeseService.getAllCheese$();
          })
        )
        .subscribe();
    }
  }

  onAddClick(): void {}
}
