import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpProcessorService {

  constructor (
  ) {}

  process(observable: Observable<any>): Observable<any> {
    observable.subscribe({
      error: error => console.log(error)
    });

    return observable;
  }
}
