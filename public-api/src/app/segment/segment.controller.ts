import { Segment } from '@libs';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { OptimalInvestmentEquationService } from '../breach-probability/services/optimal-investment-equation.service';
import { UserRequest } from '../models/request.type';
import { InvestmentCalculatorService } from './services/investment-calculator.service';
import { SegmentService } from './services/segment.service';

@Controller('segments')
export class SegmentController {
  constructor(
    private readonly breachProbabilityService: OptimalInvestmentEquationService,
    private readonly investmentCalculatorService: InvestmentCalculatorService,
    private readonly segmentService: SegmentService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('segment')
  storeSegment(@Body() segment: Segment): Observable<string> {
    try {
      return this.segmentService.storeSegment(segment).pipe(
        catchError(() =>
          of({} as string).pipe(
            tap(() => {
              throw new HttpException(
                'Store segment failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Store segment failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('segments/:companyId')
  getSegment(
    @Param('companyId') companyId: string,
  ): Observable<Segment[] | undefined> {
    try {
      return this.segmentService.getSegments(companyId).pipe(
        catchError(() =>
          of({} as Segment[] | undefined).pipe(
            tap(() => {
              throw new HttpException(
                'Getting segments failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Getting segments failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('segment/:id')
  deleteSegment(@Param('id') id: string): Observable<void> {
    try {
      return this.segmentService.deleteSegment(id).pipe(
        catchError(() =>
          of(undefined).pipe(
            tap(() => {
              throw new HttpException(
                'Delete segment failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Delete segment failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('investment-calculation')
  calculateInvestment(
    @Request() request: UserRequest,
    @Body() segments: Segment[],
  ): Observable<Segment[]> {
    return this.breachProbabilityService.getFunction(request.user.userId).pipe(
      switchMap((equation) =>
        this.investmentCalculatorService.calculateInvestments(
          segments,
          equation,
        ),
      ),
      switchMap((segments) => this.segmentService.updateSegments(segments)),
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

  @UseGuards(AuthenticatedGuard)
  @Post('investment-calculation-without-segmentation')
  calculateInvestmentWithoutSegmentation(
    @Request() request: UserRequest,
    @Body() segments: Segment[],
  ): Observable<Partial<Segment>> {
    return this.breachProbabilityService.getFunction(request.user.userId).pipe(
      switchMap((equation) =>
        this.investmentCalculatorService.calculateInvestmentsWithoutSegmentation(
          segments,
          equation,
        ),
      ),
      catchError(() =>
        of({} as Partial<Segment>).pipe(
          tap(() => {
            throw new HttpException(
              'Calculation of optimal investment without segmentation failed!',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      ),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('test-optimal-investment')
  calculateTestInvestment(
    @Request() request: UserRequest,
    @Body() body: { segments: Segment[]; bpf: string },
  ): Observable<Segment[]> {
    return this.breachProbabilityService.getFunction(request.user.userId).pipe(
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

  @UseGuards(AuthenticatedGuard)
  @Patch('segment')
  updateSegment(@Body() segment: Segment): Observable<Segment> {
    try {
      return this.segmentService.updateSegments([segment]).pipe(
        map((segments) => segments?.[0]),
        catchError(() =>
          of({} as Segment).pipe(
            tap(() => {
              throw new HttpException(
                'Update segment failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Update segment failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
