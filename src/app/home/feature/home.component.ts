import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherServiceService } from '../services/weather-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  weatherService = inject(WeatherServiceService);
}
