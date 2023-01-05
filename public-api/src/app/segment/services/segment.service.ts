import { Segment } from '@libs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { forkJoin, from, map, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class SegmentService {
  constructor(
    @InjectModel('segments') private readonly segmentModel: Model<Segment>,
  ) {}

  storeSegment(segment: Segment): Observable<string> {
    // TODO CH: fix me
    // @ts-ignore
    return from(new this.segmentModel(segment).save()).pipe(
      map((value) => value._id),
    );
  }

  getSegment(segmentID: string): Observable<Segment> {
    return from(this.segmentModel.findOne({ id: segmentID })).pipe(
      map((segment) => this.mapToDetailedSegment(segment, segment.companyId)),
    );
  }
  getSegments(companyId: string): Observable<Segment[]> {
    return from(this.segmentModel.find({ companyId })).pipe(
      map((segments) =>
        Array.isArray(segments)
          ? segments.map((segment) => this.mapToSegment(segment, companyId))
          : [this.mapToSegment(segments, companyId)],
      ),
    );
  }

  deleteSegment(id: string): Observable<void> {
    return from(this.segmentModel.findById(id)).pipe(
      switchMap((model) => model.delete()),
      map(() => undefined),
    );
  }

  updateSegments(segments: Segment[]): Observable<Segment[]> {
    return forkJoin(
      ...segments.map((segment) =>
        from(this.segmentModel.findById(segment.id)).pipe(
          tap((model) => {
            (model.name = segment.name),
              (model.type = segment.type),
              (model.typeDescription = segment.typeDescription),
              (model.value = segment.value),
              (model.risk = segment.risk),
              (model.vulnerability = segment.vulnerability),
              (model.calculatedVulnerability = segment.calculatedVulnerability),
              (model.optimalInvestment = segment.optimalInvestment),
              (model.expectedLossBeforeInvestment =
                segment.expectedLossBeforeInvestment),
              (model.expectedLossWithInvestment =
                segment.expectedLossWithInvestment),
              (model.totalCybersecurityCosts = segment.totalCybersecurityCosts);
          }),
          switchMap((model) => from(model.save())),
          map((segment) => this.mapToSegment(segment, segment.companyId)),
        ),
      ),
    );
  }

  private mapToSegment(model: any, companyId: string): Segment {
    return {
      id: model._id,
      companyId,
      name: model.name,
      type: model.type,
      typeDescription: model.typeDescription,
      value: model.value,
      risk: model.risk,
      vulnerability: model.vulnerability,
      calculatedVulnerability: model.calculatedVulnerability,
      optimalInvestment: model.optimalInvestment,
      expectedLossBeforeInvestment: model.expectedLossBeforeInvestment,
      expectedLossWithInvestment: model.expectedLossWithInvestment,
      totalCybersecurityCosts: model.totalCybersecurityCosts,
    };
  }

  private mapToDetailedSegment(model: any, companyId: string): Segment {
    const investmentValues = [
      0,
      model.optimalInvestment,
      model.optimalInvestment * 2,
    ];
    const details = investmentValues.map((investment: number) => {
      // TODO use probability function from DB and evaluate in that way
      const breachProbablity =
      const ebis = (model.vulnerability - breachProbablity) / model.value;
        model.vulnerability / (1 + investment / (model.value * 0.001));
      const enbis = ebis - investment;
      const segmentDetail = {
        investment: investment,
        breachProbability: breachProbablity,
        ebis: ebis,
        enbis: enbis,
      };
      return segmentDetail;
    });

    const segment = this.mapToSegment(model, companyId);
    segment.details = details;
    return segment;
  }
}
