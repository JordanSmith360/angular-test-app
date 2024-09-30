import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  SecondPageInterface,
  SecondPageServiceService,
} from '../services/second-page-service.service';
import { LoggingServiceService } from 'src/app/shared/services/logging-service/logging-service.service';
import { TwoWayBindingComponent } from '../ui/two-way-binding/two-way-binding.component';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
  standalone: true,
  imports: [TwoWayBindingComponent, CommonModule],
})
export class SecondPageComponent {
  idNumber: string = '';
  names!: SecondPageInterface[];
  catFact: string | undefined;
  catFactLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private secondPageService: SecondPageServiceService,
    private logger: LoggingServiceService
  ) {
    this.idNumber = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.getNewFact();
  }
  getNewFact() {
    this.catFactLoading = true;
    this.secondPageService.getCatFact().subscribe((event) => {
      this.logger.logDebug(event);
      this.catFact = event.data.at(0);
      this.catFactLoading = false;
    });
  }
}
