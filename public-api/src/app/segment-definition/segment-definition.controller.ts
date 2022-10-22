import { SegmentDefinition, ValueEstimation } from '@libs';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { catchError, Observable, of, tap } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { SegmentDefinitionService } from './services/segment-definition.service';

@Controller('segment-definitions')
export class SegmentDefinitionController {
  constructor(
    private readonly segmentDefinitionService: SegmentDefinitionService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('definitions')
  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    try {
      return this.segmentDefinitionService.getSegmentDefinitions().pipe(
        catchError(() =>
          of({} as SegmentDefinition[]).pipe(
            tap(() => {
              throw new HttpException(
                'Getting segment definitions failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Wrong values for value estimation!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('value-estimation')
  calculateValue(@Body() data: ValueEstimation): number {
    try {
      return this.segmentDefinitionService.calculateValue(
        data.segment,
        data.keyValuePairs,
      );
    } catch (error) {
      throw new HttpException(
        'Wrong values for value estimation!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
