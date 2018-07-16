import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HourCost } from '../models/hour-cost';

@Injectable({
  providedIn: 'root'
})
export class HourCostsService {

  private URL = '/api/hourcosts';

  constructor (
    private http: HttpClient
  ) {}

  getHourCosts(): Promise<HourCost[]> {
    return this.http.get<HourCost[]>(this.URL).toPromise();
  }

  saveHourCost(hourCost: HourCost): Promise<HourCost> {
    return this.http.post<HourCost>(this.URL, hourCost).toPromise();
  }

  deleteHourCost(id: number): Promise<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).toPromise();
  }
}
