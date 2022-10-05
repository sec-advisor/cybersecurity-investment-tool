import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptimalInvestmentEquation } from '@libs';
import { map, Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class EquationDataService {
  constructor(private http: HttpClient) {}

  getOptimalInvestmentEquation(): Observable<string> {
    return this.http
      .get<OptimalInvestmentEquation>(
        `${backend.url}/optimal-investment-equation/equations`,
        httpOptions,
      )
      .pipe(map((equation) => equation.optimalInvestmentEquation));
  }
}
