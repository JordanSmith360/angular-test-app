import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterServiceService {
  private counter = new BehaviorSubject(0);
  getCounter = this.counter.asObservable();
  incCounter() {
    this.counter.next(this.counter.value + 1);
  }
}
