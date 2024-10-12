import { Component, inject, OnInit } from '@angular/core';
import { CheeseItemComponent } from '../cheese-item/cheese-item.component';
import { Cheese } from '../../interfaces/cheese.interface';
import { CheeseService } from '../../services/cheese.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cheese-list',
  standalone: true,
  imports: [CheeseItemComponent, CommonModule, RouterLink],
  templateUrl: './cheese-list.component.html',
  styleUrl: './cheese-list.component.scss',
  providers: [],
})
export class CheeseListComponent implements OnInit {
  cheeseService = inject(CheeseService);
  cheeseList: Cheese[] = [];
  cheeseList$: Observable<Cheese[]> = new Observable<Cheese[]>();

  ngOnInit(): void {
    this.cheeseList$ = this.cheeseService.getAllCheese$();
    // cheeseList$.subscribe((cheeseList) => {
    //   this.cheeseList = cheeseList;
    // });
  }

  onCheeseClick(): void {
    //dp sthe
  }

  onAddClick(): void {}
}
