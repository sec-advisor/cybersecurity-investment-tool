import { Segment } from '@libs';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { OptimalInvestmentEquationService } from '../breach-probability/services/optimal-investment-equation.service';
import { InvestmentCalculatorService } from '../segment/services/investment-calculator.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private breachProbabilityService: OptimalInvestmentEquationService,
    private investmentCalculatorService: InvestmentCalculatorService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('optimal-investment')
  calculateInvestment(
    @Body() body: { segments: Segment[]; bpf: string },
  ): Observable<Segment[]> {
    return this.breachProbabilityService.getFunction().pipe(
      switchMap((equation) =>
        this.investmentCalculatorService.calculateInvestments(body.segments, {
          optimalInvestmentEquation: equation.optimalInvestmentEquation,
          breachProbabilityFunction: body.bpf,
        }),
      ),
      catchError(() =>
        of({} as Segment[]).pipe(
          tap(() => {
            throw new HttpException(
              'Calculation of optimal investment failed!',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      ),
    );
  }
}
