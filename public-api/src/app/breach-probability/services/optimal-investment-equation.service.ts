import { OptimalInvestmentEquation } from '@libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SettingsService } from '../../settings/services/settings.service';

@Injectable()
export class OptimalInvestmentEquationService {
  constructor(
    @InjectModel('optimal-investment-equations')
    private readonly optimalInvestmentModel: Model<OptimalInvestmentEquation>,
    private settingsService: SettingsService,
  ) {}

  getFunction(userId: string): Observable<OptimalInvestmentEquation> {
    return this.settingsService.get(userId).pipe(
      switchMap((settings) =>
        from(this.optimalInvestmentModel.find().exec()).pipe(
          map((functions) => functions[0]),
          map((equation) => ({
            optimalInvestmentEquation: equation.optimalInvestmentEquation,
            breachProbabilityFunction:
              settings?.bpf || equation.breachProbabilityFunction,
          })),
        ),
      ),
    );
  }

  getOriginFunction(): Observable<OptimalInvestmentEquation> {
    return from(this.optimalInvestmentModel.find().exec()).pipe(
      map((functions) => functions[0]),
      map((equation) => ({
        optimalInvestmentEquation: equation.optimalInvestmentEquation,
        breachProbabilityFunction: equation.breachProbabilityFunction,
      })),
    );
  }
}
