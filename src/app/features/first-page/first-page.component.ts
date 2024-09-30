import { Component } from '@angular/core';
import { CounterServiceService } from 'src/app/core/services/counter-service/counter-service.service';
import { UserDetails } from './models/user-details';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModelFormGroup } from '../../core/helpers/interface-helpers';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
})
export class FirstPageComponent {
  pageTwoId: string | null = null;
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
