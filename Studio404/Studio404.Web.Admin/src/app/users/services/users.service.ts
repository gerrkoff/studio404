import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor (
    private http: HttpClient
  ) {}

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>('/api/usermanager').toPromise();
  }

  updateAdminRole(userId: string, isAdmin: boolean): Promise<void> {
    return this.http.post<void>('/api/usermanager', {userId, isAdmin}).toPromise();
  }
}
