import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SecondPageInterface {
  name: string;
  surname: string;
}

export interface ResponseObject {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SecondPageServiceService {
  constructor(private http: HttpClient) {}

  getCatFact(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(environment.url);
  }
}
