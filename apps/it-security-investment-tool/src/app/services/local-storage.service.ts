import { Injectable } from '@angular/core';

import { StorageKey } from '../models/storage-key.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(key: StorageKey, value: any): void {
    localStorage.setItem(key, value);
  }

  getItem(key: StorageKey): any | undefined {
    return localStorage.getItem(key);
  }

}
