import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class HttpProcessorService {

  constructor (
    private notificationService: NzNotificationService
  ) {}

  process(observable: Observable<any>): Observable<any> {
    observable.subscribe({
      error: response => this.notificationService.create('error', `${response.status} - ${response.statusText}`, response.error.message || response.error.Message)
    });

    return observable;
  }
}
