import { BpfValidationResponse, OptimalInvestmentEquation } from '@libs';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { UserRequest } from '../models/request.type';
import { BpfValidatorService } from './services/bpf-validator.service';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

@Controller('optimal-investment-equation')
export class OptimalInvestmentEquationController {
  constructor(
    private bpfValidatorService: BpfValidatorService,
    private optimalInvestmentEquationService: OptimalInvestmentEquationService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('equations')
  getEquation(
    @Request() request: UserRequest,
  ): Observable<OptimalInvestmentEquation> {
    return this.optimalInvestmentEquationService
      .getFunction(request.user.userId)
      .pipe(
        map((equation) => ({
          optimalInvestmentEquation: equation.optimalInvestmentEquation,
          breachProbabilityFunction: equation.breachProbabilityFunction,
        })),
      );
  }

  @UseGuards(AuthenticatedGuard)
  @Get('equations-origin')
  getOriginEquation(): Observable<OptimalInvestmentEquation> {
    return this.optimalInvestmentEquationService.getOriginFunction().pipe(
      map((equation) => ({
        optimalInvestmentEquation: equation.optimalInvestmentEquation,
        breachProbabilityFunction: equation.breachProbabilityFunction,
      })),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('validate')
  calculateOptimalInvestment(
    @Body() body: { bpf: string },
  ): Observable<BpfValidationResponse> {
    return of(this.bpfValidatorService.validate(body.bpf));
  }
}
