import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface WeatherItem {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface UpdateWeatherItem {
  id: number;
  date: Date;
  temperature: number;
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
    this.weather$.subscribe((weatherItems) => {
      this._weatherState.update((state) => ({
        ...state,
        loading: false,
        weatherItems,
      }));
    });
  }

  updateWeatherItem(item: WeatherItem) {
    const request: UpdateWeatherItem = {
      id: item.id,
      date: item.date,
      temperature: item.temperatureC,
      summary: item.summary,
    };

    this.http
      .put('weather', request)
      .pipe(
        catchError((err) => {
          console.log('error', err);
          return of();
        }),
      )
      .subscribe((t) => {
        const list = this.weatherItems();
        const updateItemIndex = list.findIndex((x) => x.id == item.id);
        list[updateItemIndex] = item;

        this._weatherState.update((state) => ({
          ...state,
          weatherItems: list,
        }));
      });
  }

  deleteWeatherItem(id: number) {
    this.http
      .delete(`weather?id=${id}`)
      .pipe(
        catchError((err) => {
          console.log('error', err);
          return of();
        }),
      )
      .subscribe((t) => {
        const list = this.weatherItems().filter((x) => x.id !== id);
        this._weatherState.update((state) => ({
          ...state,
          weatherItems: list,
        }));
      });
  }

  private getWeather(): Observable<WeatherItem[]> {
    return this.http.get<WeatherItem[]>(`weather`).pipe(
      retry({
        count: 2,
        delay: 2000,
      }),
      catchError(() => {
        this._weatherState.update((state) => ({
          ...state,
          error: 'An error has occured',
        }));
        return of([]);
      }),
      map((items) =>
        items.map((x) => ({
          ...x,
          temperatureC: Math.round(x.temperatureC * 100) / 100,
          temperatureF: Math.round(x.temperatureF * 100) / 100,
        })),
      ),
      takeUntilDestroyed(),
    );
  }
}
