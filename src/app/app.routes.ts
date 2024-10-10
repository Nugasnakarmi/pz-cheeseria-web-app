import { Routes } from '@angular/router';
import { CheeseItemComponent } from '../app/components/cheese-item/cheese-item.component';
import { CheeseListComponent } from './components/cheese-list/cheese-list.component';

export const routes: Routes = [ 
    { path: 'cheese-item',      component: CheeseItemComponent },
    {
      path: 'cheese-list',
      component: CheeseListComponent,
      data: { title: 'Chese List' }
    },
    { path: '',
      redirectTo: '/cheese-list',
      pathMatch: 'full'
    },];
