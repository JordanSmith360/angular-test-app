import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherItem } from '../../services/weather-service.service';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelFormGroup } from 'src/app/shared/helpers/interface-helpers';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './weather-cards.component.html',
  styles: [],
})
export class WeatherCardsComponent implements OnInit {
  @Input({ required: true })
  weatherItem!: WeatherItem;

  @Output()
  removeItemEvent = new EventEmitter<number>();
  @Output()
  updateItemEvent = new EventEmitter<WeatherItem>();

  fb = inject(FormBuilder);
  editMode = signal(false);

  formControl: ModelFormGroup<Omit<WeatherItem, 'id'>> = this.fb.nonNullable.group({
    date: [new Date(), Validators.required],
    summary: ['', Validators.required],
    temperatureC: [0, [Validators.min(-50), Validators.max(100)]],
    temperatureF: [0],
  });

  ngOnInit() {
    this.formControl.patchValue(this.weatherItem);
    this.formControl.controls.temperatureC.valueChanges.subscribe((change) => {
      this.formControl.controls.temperatureF.patchValue(
        32 + Math.round((change / 0.5556) * 100) / 100,
      );
    });
  }

  onCancel() {
    this.editMode.set(false);
    this.formControl.patchValue(this.weatherItem);
  }

  onSubmit() {
    this.editMode.set(false);
    this.updateItemEvent.emit({ ...this.weatherItem, ...this.formControl.getRawValue() });
    this.formControl.patchValue(this.weatherItem);
  }
}
