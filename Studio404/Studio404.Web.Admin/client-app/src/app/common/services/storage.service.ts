import { Injectable } from '@angular/core';

const tokenKey: string = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  TokenSave(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  TokenLoad(): void {
    localStorage.getItem(tokenKey);
  } 

  TokenClear(): void {
    localStorage.removeItem(tokenKey)
  }
}