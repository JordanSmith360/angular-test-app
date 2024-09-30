import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModelFormGroup } from 'src/app/shared/helpers/interface-helpers';
import { UserDetails } from '../services/models/user-details';
import { CounterServiceService } from 'src/app/shared/services/counter-service/counter-service.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
  ],
})
export class FirstPageComponent {
  pageTwoId = signal<string | null>(null);
  capturedUserDetails: UserDetails[] = [];
  formControl: ModelFormGroup<UserDetails>;

  constructor(
    private counterService: CounterServiceService,
    private fb: FormBuilder
  ) {
    this.formControl = fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      heightCm: [0, [Validators.min(100), Validators.max(200)]],
      isCool: [false],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  incrementCount() {
    this.counterService.incCounter();
  }

  onSubmit() {
    console.log(this.formControl.value);
    this.capturedUserDetails.push(this.formControl.value as UserDetails);
  }
}
