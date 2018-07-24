import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HourCost } from '../models/hour-cost';
import { HttpProcessorService } from '../../common/services/http-processor.service';

@Injectable({
  providedIn: 'root'
})
export class HourCostsService {

  private URL = '/api/hourcosts';

  constructor (
    private http: HttpClient,
    private httpProcessor: HttpProcessorService
  ) {}

  getHourCosts(): Observable<HourCost[]> {
    return this.httpProcessor.process(
      this.http.get<HourCost[]>(this.URL)
    );
  }

  saveHourCost(hourCost: HourCost): Observable<HourCost> {
    return this.httpProcessor.process(
      this.http.post<HourCost>(this.URL, hourCost)
    );
  }

  deleteHourCost(id: number): Observable<void> {
    return this.httpProcessor.process(
      this.http.delete<void>(`${this.URL}/${id}`)
    );
  }
}
