import { Component, OnInit } from '@angular/core';
import { Segment } from '@libs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { SegmentDataService } from '../../../services/backend/segment-data.service';
import { SegmentDetail } from '@libs/dist/api-interfaces';

@Component({
  selector: 'app-investment-detail-table',
  templateUrl: './investment-detail-table.component.html',
  styleUrls: ['./investment-detail-table.component.scss'],
})
export class InvestmentDetailTableComponent implements OnInit {
  segmentId!: string;
  stream$!: Observable<Segment | undefined>;

  constructor(
    private segmentDataService: SegmentDataService,
    public modal: NgbActiveModal,
  ) {}

  investmentDetail: SegmentDetail = {
    investment: 0,
    breachProbability: NaN,
    ebis: NaN,
    enbis: NaN,
  };

  changeInvestment(event: any) {
    const newInvestmentValue = event.target.value;
    this.investmentDetail = {
      investment: newInvestmentValue,
      breachProbability: newInvestmentValue,
      ebis: newInvestmentValue,
      enbis: newInvestmentValue,
    };
  }

  ngOnInit() {
    this.stream$ = this.segmentDataService.getSegmentDetails(this.segmentId);
  }
}
