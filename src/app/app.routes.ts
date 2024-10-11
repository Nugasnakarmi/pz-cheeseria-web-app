import { Routes } from '@angular/router';
import { CheeseItemComponent } from '../app/components/cheese-item/cheese-item.component';
import { CheeseListComponent } from './components/cheese-list/cheese-list.component';
import { CheeseFormComponent } from './components/cheese-form/cheese-form.component';
import { CheeseShopComponent } from './components/cheese-shop/cheese-shop.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cheese-shop', pathMatch: 'full' },
  { path: 'cheese-item', component: CheeseItemComponent },
  {
    path: 'cheese-list',
    component: CheeseListComponent,
    data: { title: 'Cheese List' },
  },
  {
    path: 'cheese-form',
    component: CheeseFormComponent,
    data: { title: 'Cheese Form' },
  },
  {
    path: 'cheese-shop',
    component: CheeseShopComponent,
    data: { title: 'Cheese Shop' },
  },
];
