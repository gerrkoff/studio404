import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiscInfo } from '../models/misc-info';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  private miscInfoPromise: Promise<MiscInfo>;

  constructor (
    private http: HttpClient
  ) {}

  getMiscInfo(refresh: boolean = false): Promise<MiscInfo> {

    if (this.miscInfoPromise && !refresh) {
      return this.miscInfoPromise;
    }

    this.miscInfoPromise = this.http.get<MiscInfo>('/api/misc').toPromise();

    return this.miscInfoPromise;
  }
}
