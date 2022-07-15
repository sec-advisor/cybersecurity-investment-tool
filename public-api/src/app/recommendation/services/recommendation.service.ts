import { HttpService, Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { LeadingPeriod, RecommendationProfile, ROSIDetail } from '../../../models/api-interfaces';

@Injectable()
export class RecommendationService {

  constructor(private httpService: HttpService) { }

  recommend(body: RecommendationProfile): Observable<any> {
    // TODO CH: solve
    // const url = 'http://ml_decision_server:5000';
    // const url = 'http://192.168.200.130:5000'
    const url = 'http://localhost:5000';
    return this.httpService.post(`${url}/v1/recommend`, body).pipe(map(response => response.data.recommendedServices));
  }

  calculateROSI(rosiDetail: ROSIDetail): Observable<ROSIDetail> {
    return of(rosiDetail).pipe(
      map(rosiDetail => ({
        ...rosiDetail,
        rosi: this.getROSI(rosiDetail)
      }))
    );
  }

  private getROSI(rosiDetail: ROSIDetail): number {
    // ROSI = ((SLE * ARO * mitigation rate) - Cost of the investment) / Cost of the investment
    // SLE = Estimated cost of a security incident
    // ARO = Estimated annual rate of a incidence occurrence
    const investmentCost = this.getAnnualInvestmentCost(rosiDetail.price, rosiDetail.leasingPeriod);
    return Math.round(
      ((rosiDetail.costOfIncident * rosiDetail.incidenceOccurrence * rosiDetail.mitigationRate) - investmentCost)
      / investmentCost);
  }

  private getAnnualInvestmentCost(price: number, leasingPeriod: LeadingPeriod): number {
    const factor = [
      { period: LeadingPeriod.Minutes, annualFactor: 525600 },
      { period: LeadingPeriod.Days, annualFactor: 365 },
      { period: LeadingPeriod.Months, annualFactor: 12 },
    ].find(({ period }) => period === leasingPeriod).annualFactor;
    return price * factor;
  }
}
