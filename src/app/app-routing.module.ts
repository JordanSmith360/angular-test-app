import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './features/first-page/first-page.component';
import { SecondPageComponent } from './features/second-page/second-page.component';

const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent,
  },
  {
    path: 'second-component/:id',
    component: SecondPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
