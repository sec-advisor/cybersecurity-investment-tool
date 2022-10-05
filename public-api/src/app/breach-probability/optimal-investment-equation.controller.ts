import { OptimalInvestmentEquation } from '@libs';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

@Controller('optimal-investment-equation')
export class OptimalInvestmentEquationController {
  constructor(
    private optimalInvestmentEquationService: OptimalInvestmentEquationService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('equations')
  getEquation(): Observable<OptimalInvestmentEquation> {
    return this.optimalInvestmentEquationService.getFunction().pipe(
      map((equation) => ({
        optimalInvestmentEquation: equation.optimalInvestmentEquation,
        breachProbabilityFunction: equation.breachProbabilityFunction,
      })),
    );
  }
}
