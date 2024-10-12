import { Routes } from '@angular/router';
import { CheeseItemComponent } from '../app/components/cheese-item/cheese-item.component';
import { CheeseListComponent } from './components/cheese-list/cheese-list.component';
import { CheeseFormComponent } from './components/cheese-form/cheese-form.component';
import { CheeseShopComponent } from './components/cheese-shop/cheese-shop.component';
import { CheeseUpdateComponent } from './components/cheese-update/cheese-update.component';
import { CheeseAddComponent } from './components/cheese-add/cheese-add.component';

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
  {
    path: 'cheese-add',
    component: CheeseAddComponent,
    data: { title: 'Cheese Add' },
  },
  {
    path: 'cheese-update/:id',
    component: CheeseUpdateComponent,
    data: { title: 'Cheese Update' },
  },
];
