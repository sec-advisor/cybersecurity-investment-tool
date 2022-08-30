import { Component, Input } from '@angular/core';

import { Segment } from '../../../../libs/api-interfaces';

@Component({
  selector: 'app-segment-overview-table',
  templateUrl: './segment-overview-table.component.html',
  styleUrls: ['./segment-overview-table.component.scss']
})
export class SegmentOverviewTableComponent {

  @Input() data?: { segments: Segment[], totalInvestment: number | undefined, withoutSegmentation: Partial<Segment> | undefined }


  getCalculatedInvestmentTotal(segments: Segment[]): number {
    return segments.reduce((pre, curr) => pre + (curr.optimalInvestment ?? 0), 0);
  }

  getLossWithInvestmentTotal(segments: Segment[]): number {
    return Math.round(segments.reduce((pre, curr) => pre + (curr.expectedLossWithInvestment ?? 0), 0));
  }

  getTotalCosts(segments: Segment[]): number {
    return Math.round(segments.reduce((pre, curr) => pre + (curr.optimalInvestment ?? 0) + (curr.expectedLossWithInvestment ?? 0), 0));
  }

}
