import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherItem, WeatherServiceService } from '../services/weather-service.service';
import { RouterLink } from '@angular/router';
import { WeatherCardsComponent } from '../ui/weather-cards/weather-cards.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherCardsComponent, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  weatherService = inject(WeatherServiceService);
  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  trackByItems(index: number, item: WeatherItem): number {
    return item.id;
  }

  onUpdateOfItem(item: WeatherItem) {
    this.weatherService.updateWeatherItem(item);
  }

  onDeletionOfItem(id: number) {
    this.weatherService.deleteWeatherItem(id);
  }
}
