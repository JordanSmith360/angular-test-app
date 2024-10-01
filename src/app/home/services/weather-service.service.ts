import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface WeatherItem {
  date: Date;
  temperatureC: number;
  termpartureF: number;
  summary: string;
}

interface WeatherState {
  error: string | null;
  loading: boolean;
  weatherItems: WeatherItem[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  http = inject(HttpClient);

  //sources
  weather$ = this.getWeather();

  // state
  private _weatherState = signal<WeatherState>({
    error: null,
    loading: true,
    weatherItems: [],
  });

  // selectors
  weatherItems = computed(() => this._weatherState().weatherItems);
  loading = computed(() => this._weatherState().loading);
  error = computed(() => this._weatherState().error);

  constructor() {
    this.weather$.pipe(takeUntilDestroyed()).subscribe((weatherItems) => {
      console.log('Here', weatherItems);
      this._weatherState.update((state) => ({
        ...state,
        loading: false,
        weatherItems,
      }));
    });
  }

  private getWeather(): Observable<WeatherItem[]> {
    return this.http.get<WeatherItem[]>(`${environment.url}/weather`);
  }
}
