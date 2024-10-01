import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardsComponent } from './weather-cards.component';

describe('WeatherCardsComponent', () => {
  let component: WeatherCardsComponent;
  let fixture: ComponentFixture<WeatherCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherCardsComponent]
    });
    fixture = TestBed.createComponent(WeatherCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
