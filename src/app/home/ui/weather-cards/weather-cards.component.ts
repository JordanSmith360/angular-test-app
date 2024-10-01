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
  template: `<mat-card appearance="outlined" style="margin: 10px">
    <ng-container *ngIf="!editMode(); then viewModeContext; else editModeContext"></ng-container>
    <ng-template #viewModeContext>
      <mat-card-header>
        <mat-card-title> {{ weatherItem.date | date: 'medium' }}</mat-card-title>
        <mat-card-subtitle>{{ weatherItem.summary }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content> TempC : {{ weatherItem.temperatureC }} </mat-card-content>
      <mat-card-content> TempF : {{ weatherItem.temperatureF }} </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button (click)="editMode.set(true)">Edit</button>
        <button mat-button (click)="removeItemEvent.emit(weatherItem.id)">Delete</button>
      </mat-card-actions>
    </ng-template>
    <ng-template #editModeContext>
      <mat-card-header>
        <mat-card-title> Edit </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="formControl">
          <p>
            <mat-form-field>
              <mat-label>Date</mat-label>
              <input matInput placeholder="enter date" formControlName="date" required />
              <mat-error *ngIf="formControl.get('date')?.invalid"> date is required </mat-error>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field>
              <mat-label>Summary</mat-label>
              <input matInput placeholder="enter summary" formControlName="summary" required />
              <mat-error *ngIf="formControl.get('summary')?.invalid">
                summary is required
              </mat-error>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field>
              <mat-label>TempC</mat-label>
              <input
                matInput
                placeholder="enter temperature in celcius"
                formControlName="temperatureC"
                required
              />
              <mat-error *ngIf="formControl.get('temperatureC')?.invalid">
                temperature is required or invalid
              </mat-error>
            </mat-form-field>
          </p>
        </form>
      </mat-card-content>
      <mat-card-content> TempF: {{ formControl.get('temperatureF')?.value }} </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button [disabled]="!formControl.valid" (click)="onSubmit()">Save</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </mat-card-actions>
    </ng-template>
  </mat-card> `,
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
