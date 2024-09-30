import { Component } from '@angular/core';
import { CounterServiceService } from 'src/app/core/services/counter-service/counter-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  youngNumber = -1;
  constructor(counterService: CounterServiceService) {
    counterService.getCounter.subscribe((val) => (this.youngNumber = val));
  }
}