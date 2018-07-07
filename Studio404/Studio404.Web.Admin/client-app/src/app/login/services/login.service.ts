import { Injectable } from '@angular/core';
import { LoginInfo } from '../models/login-info';
import { LoginResultEnum } from '../models/login-result-enum';
import { LoginResult } from '../models/login-result';
import { StorageService } from '../../common/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (
    private storageService: StorageService
  ) {}

  login(loginInfo: LoginInfo): Promise<LoginResultEnum> {
    let loginResult: LoginResult;
    if (loginInfo.username.indexOf('err') > -1)
      loginResult = {
        loginResult: LoginResultEnum.WrongUsernamePassword,
        token: null
      }
    else if (loginInfo.username.indexOf('unk') > -1)
      loginResult = {
        loginResult: LoginResultEnum.Unknown,
        token: null
      }
    else
      loginResult = {
        loginResult: LoginResultEnum.Success,
        token: 'token'
      }

    if (loginResult.loginResult === LoginResultEnum.Success) {
      this.storageService.TokenSave(loginResult.token);
    }

    return new Promise(resolve => setTimeout(() => resolve(loginResult.loginResult), 3000));
  }
}
