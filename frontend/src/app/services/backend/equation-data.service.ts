import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BpfValidationResponse, OptimalInvestmentEquation } from '@libs';
import { map, Observable } from 'rxjs';

import { backend } from '../../constants/backend.constants';
import { httpOptions } from '../../constants/http-options.constants';

@Injectable({
  providedIn: 'root',
})
export class EquationDataService {
  constructor(private http: HttpClient) {}

  getEquation(): Observable<string> {
    return this.http
      .get<OptimalInvestmentEquation>(
        `${backend.url}/optimal-investment-equation/equations`,
        httpOptions,
      )
      .pipe(map((equation) => equation.optimalInvestmentEquation));
  }

  getOriginBbf(): Observable<string> {
    return this.http
      .get<OptimalInvestmentEquation>(
        `${backend.url}/optimal-investment-equation/equations-origin`,
        httpOptions,
      )
      .pipe(map((equation) => equation.breachProbabilityFunction));
  }

  getBpf(): Observable<string> {
    return this.http
      .get<OptimalInvestmentEquation>(
        `${backend.url}/optimal-investment-equation/equations`,
        httpOptions,
      )
      .pipe(map((equation) => equation.breachProbabilityFunction));
  }

  validateBpf(bpf: string): Observable<BpfValidationResponse> {
    return this.http.post<BpfValidationResponse>(
      `${backend.url}/optimal-investment-equation/validate`,
      { bpf },
      httpOptions,
    );
  }
}
