import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessProfile } from '@app/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileDataService {

  constructor(private http: HttpClient) { }

  storeData(profile: BusinessProfile): Observable<boolean> {
    return this.http.post<boolean>('api/business-profile', profile);
  }

}
