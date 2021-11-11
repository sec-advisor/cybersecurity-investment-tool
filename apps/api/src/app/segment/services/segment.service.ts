import { Segment } from '@app/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { forkJoin, from, map, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class SegmentService {

  constructor(@InjectModel('segments') private readonly segmentModel: Model<Segment>) {
  }

  storeSegment(segment: Segment): Observable<string> {
    return from(new this.segmentModel(segment).save()).pipe(map(value => value._id));
  }

  getSegments(companyId: string): Observable<Segment[]> {
    return from(this.segmentModel.find({ companyId })).pipe(
      map(segments => Array.isArray(segments) ?
        segments.map(segment => this.mapToSegment(segment, companyId)) :
        [this.mapToSegment(segments, companyId)]
      )
    );
  }

  deleteSegment(id: string): Observable<void> {
    return from(this.segmentModel.findById(id)).pipe(
      switchMap(model => model.delete()),
      map(() => undefined)
    );
  }

  updateSegments(segments: Segment[]): Observable<Segment[]> {
    return forkJoin(...segments.map(segment => from(this.segmentModel.findById(segment.id)).pipe(
      tap(model => {
        model.name = segment.name,
          model.type = segment.type,
          model.value = segment.value,
          model.risk = segment.risk,
          model.vulnerability = segment.vulnerability,
          model.suggestedInvestment = segment.suggestedInvestment
      }),
      switchMap(model => from(model.save())),
      map(s => this.mapToSegment(s, s.companyId)),
    )));
  }

  private mapToSegment(model: any, companyId: string): Segment {
    return {
      id: model._id,
      companyId,
      name: model.name,
      type: model.type,
      value: model.value,
      risk: model.risk,
      vulnerability: model.vulnerability,
      suggestedInvestment: model.suggestedInvestment
    }
  }

}
