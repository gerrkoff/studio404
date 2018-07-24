import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HourCost } from '../models/hour-cost';
import { AppHttpClientService } from '../../common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class HourCostsService {

  private URL = '/api/hourcosts';

  constructor (
    private http: AppHttpClientService
  ) {}

  getHourCosts(): Observable<HourCost[]> {
    return this.http.get<HourCost[]>(this.URL);
  }

  saveHourCost(hourCost: HourCost): Observable<HourCost> {
    return this.http.post<HourCost>(this.URL, hourCost);
  }

  deleteHourCost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
