import { Injectable } from '@angular/core';
import { LoginInfo } from '../models/login-info';
import { LoginResultEnum } from '../models/login-result-enum';
import { LoginResult } from '../models/login-result';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(loginInfo: LoginInfo): Promise<LoginResultEnum> {
    let loginResult: LoginResult;
    if (loginInfo.username.indexOf('err'))
      loginResult = {
        loginResult: LoginResultEnum.WrongUsernamePassword,
        token: null
      }
    else if (loginInfo.username.indexOf('unk'))
      loginResult = {
        loginResult: LoginResultEnum.Unknown,
        token: null
      }
    else
      loginResult = {
        loginResult: LoginResultEnum.Success,
        token: 'token'
      }

    // TODO: add saving token

    return new Promise(resolve => setTimeout(() => resolve(loginResult.loginResult), 3000));
  }
}
