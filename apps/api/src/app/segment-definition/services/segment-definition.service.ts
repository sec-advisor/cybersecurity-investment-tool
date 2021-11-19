import { SegmentDefinition } from '@app/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class SegmentDefinitionService {

  constructor(@InjectModel('segment-definitions') private readonly segmentDefinitionModel: Model<SegmentDefinition>) {
  }

  getSegmentDefinitions(): Observable<SegmentDefinition[]> {
    return from(this.segmentDefinitionModel.find().exec()).pipe(
      map(segments => segments.map(segment => ({
        key: segment.key,
        description: segment.description,
        valueEstimation: segment.valueEstimation
      } as SegmentDefinition)))
    );
  }

  calculateValue(segment: SegmentDefinition, keyValuePairs: { key: string; value: number; }[]): number {
    try {
      const splitedCalculationString = segment.valueEstimation.calculation.split(' ');
      if (splitedCalculationString && keyValuePairs && keyValuePairs.every(pair => Number.isFinite(pair.value))) {
        keyValuePairs.forEach(pair => {
          const index = splitedCalculationString?.indexOf(pair.key);
          if (index !== undefined && index !== -1) {
            splitedCalculationString[index] = String(pair.value);
          }
        })

        const mergedCalculation = splitedCalculationString.reduce((pre, curr) => pre + ` ${curr}`, '')
        return eval(mergedCalculation);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  }
}
