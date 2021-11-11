import { Segment } from '@app/api-interfaces';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { InvestmentCalculatorService } from './services/investment-calculator.service';
import { SegmentService } from './services/segment.service';

@Controller('segments')
export class SegmentController {

  constructor(private readonly segmentService: SegmentService, private investmentCalculatorService: InvestmentCalculatorService) { }

  @Post('segment')
  storeSegment(@Body() segment: Segment): Observable<string> {
    try {
      return this.segmentService.storeSegment(segment).pipe(
        catchError(() => of({} as string).pipe(
          tap(() => { throw new HttpException('Store segment failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );;
    } catch (error) {
      throw new HttpException('Store segment failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('segments/:companyId')
  getSegment(@Param('companyId') companyId: string): Observable<Segment[] | undefined> {
    try {
      return this.segmentService.getSegments(companyId).pipe(
        catchError(() => of({} as Segment[] | undefined).pipe(
          tap(() => { throw new HttpException('Getting segments failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );
    } catch (error) {
      throw new HttpException('Getting segments failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('segment/:id')
  deleteSegment(@Param('id') id: string): Observable<void> {
    try {
      return this.segmentService.deleteSegment(id).pipe(
        catchError(() => of(undefined).pipe(
          tap(() => { throw new HttpException('Delete segment failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );
    } catch (error) {
      throw new HttpException('Delete segment failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('investment-calculation')
  calculateInvestment(@Body() segments: Segment[]): Observable<Segment[]> {
    return this.investmentCalculatorService.calculateInvestments(segments).pipe(
      switchMap(segments => this.segmentService.updateSegments(segments))
    );
  }

  @Patch('segment')
  updateSegment(@Body() segment: Segment): Observable<Segment> {
    try {
      return this.investmentCalculatorService.calculateInvestments([segment]).pipe(
        switchMap(segments => this.segmentService.updateSegments(segments)),
        map(segments => segments?.[0]),
        catchError(() => of({} as Segment).pipe(
          tap(() => { throw new HttpException('Update segment failed!', HttpStatus.INTERNAL_SERVER_ERROR) })))
      );
    } catch (error) {
      throw new HttpException('Update segment failed!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
