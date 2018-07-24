import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HourCost } from '../models/hour-cost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HourCostsService {

  private URL = '/api/hourcosts';

  constructor (
    private http: HttpClient
  ) {}

  getHourCosts(): Observable<HourCost[]> {
    return this.http.get<HourCost[]>(this.URL);
  }

  saveHourCost(hourCost: HourCost): Promise<HourCost> {
    return this.http.post<HourCost>(this.URL, hourCost).toPromise();
  }

  deleteHourCost(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }
}
