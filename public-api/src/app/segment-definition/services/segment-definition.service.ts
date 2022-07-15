import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';

import { SegmentDefinition } from '../../../../libs/api-interfaces';

@Injectable()
export class SegmentDefinitionService {

  constructor(@InjectModel('segment-definitions') private readonly segmentDefinitionModel: Model<SegmentDefinition>) {
  }

  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    return from(this.segmentDefinitionModel.find().exec()).pipe(
      map(segments => segments.map(segment => ({
        key: segment.key,
        description: segment.description,
        valueEstimation: segment.valueEstimation?.inputs?.length > 0 ? segment.valueEstimation : undefined,
        supportedThreats: segment.supportedThreats
      } as SegmentDefinition)))
    );
  }

  calculateValue(segment: SegmentDefinition, keyValuePairs: { key: string; value: number; }[]): number {
    try {
      const splittedCalculationString = segment.valueEstimation.calculation.split(' ');
      if (splittedCalculationString && keyValuePairs && keyValuePairs.every(pair => Number.isFinite(pair.value))) {
        keyValuePairs.forEach(pair => {
          const index = splittedCalculationString?.indexOf(pair.key);
          if (index !== undefined && index !== -1) {
            splittedCalculationString[index] = String(pair.value);
          }
        })

        const mergedCalculation = splittedCalculationString.reduce((pre, curr) => pre + ` ${curr}`, '')
        return eval(mergedCalculation);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  }
}
