import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/feature/first-page.component';
import { SecondPageComponent } from './second-page/feature/second-page.component';

export const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent,
  },
  {
    path: 'second-component/:id',
    component: SecondPageComponent,
  },
];
