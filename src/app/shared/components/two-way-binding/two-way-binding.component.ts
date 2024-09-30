import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoggingServiceService } from 'src/app/core/services/logging-service/logging-service.service';

@Component({
  selector: 'app-two-way-binding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.scss'],
})
export class TwoWayBindingComponent {
  @Input({ required: true })
  TwoWayBindingVal!: string;
  @Output() TwoWayBindingValChange = new EventEmitter<string>();

  tempVar: string = '';

  @Output() twoWayBindingEvent = new EventEmitter<string>();
  submitUpdate(value: string) {
    this.logger.logDebug(value);
    this.twoWayBindingEvent.emit(value);
  }

  constructor(private logger: LoggingServiceService) {}
}
