import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../models/login-info';
import { LoginResultEnum } from '../models/login-result-enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (
    private http: HttpClient
  ) {}

  async login(loginInfo: LoginInfo): Promise<LoginResultEnum> {
    try {
      return await this.http.post<LoginResultEnum>('/login', loginInfo).toPromise();
    }
    catch (exception) {
      console.error(exception);
      return LoginResultEnum.Unknown;
    }
  }
}
