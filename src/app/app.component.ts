import { Component } from '@angular/core';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<app-layout>
    <div header>Header</div>
    <router-outlet />
  </app-layout> `,
  styles: [],
  standalone: true,
  imports: [LayoutComponent, RouterModule],
})
export class AppComponent {
  title = 'test-app';
}
