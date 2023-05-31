import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root'
})
export class SimilarityDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(
      `${backend.url}/analyse-companies`,
      httpOptions,
    );
  }

}
