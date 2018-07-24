import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppHttpClientService } from '../../common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = '/api/users';

  constructor (
    private http: AppHttpClientService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  updateAdminRole(userId: string, isAdmin: boolean): Observable<void> {
    return this.http.post<void>(this.URL, {userId, isAdmin});
  }
}
