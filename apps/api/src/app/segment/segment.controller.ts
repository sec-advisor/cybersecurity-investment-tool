import { SegmentDefinition, ValueEstimation } from '@app/api-interfaces';
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { catchError, Observable, of, tap } from 'rxjs';

import { SegmentService } from './services/segment.service';

@Controller('segment')
export class SegmentController {

  constructor(private readonly segmentService: SegmentService) { }

  @Get('segment-definitions')
  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    try {
      return this.segmentService.getSegmentDefinitions().pipe(
        catchError(() => of({} as SegmentDefinition[]).pipe(tap(() => {
          throw new HttpException('Getting segment definitions failed!', HttpStatus.INTERNAL_SERVER_ERROR);
        })))
      );
    } catch (error) {
      throw new HttpException('Wrong values for value estimation!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('value-estimation')
  calculateValue(@Body() data: ValueEstimation): number {
    try {
      return this.segmentService.calculateValue(data.segment, data.keyValuePairs);
    } catch (error) {
      throw new HttpException('Wrong values for value estimation!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
