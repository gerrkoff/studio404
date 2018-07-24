import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = '/api/users';

  constructor (
    private http: HttpClient
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  updateAdminRole(userId: string, isAdmin: boolean): Promise<void> {
    return this.http.post<void>(this.URL, {userId, isAdmin}).toPromise();
  }
}
