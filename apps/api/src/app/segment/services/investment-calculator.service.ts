import { Segment } from '@app/api-interfaces';
import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class InvestmentCalculatorService {

  calculateInvestments(segments: Segment[]): Observable<Segment[]> {
    return of(segments).pipe(
      map(segments => segments.map(segment => ({ ...segment, suggestedInvestment: this.getInvestment(segment) })))
    );
  }

  private getInvestment(segment: Segment): number {
    const investment = segment.value * segment.risk * segment.vulnerability * 0.37;
    return Math.round(investment * 100) / 100;
  }
}
