import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, merge, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { SegmentDataService } from '../../../services/backend/segment-data.service';
import { InvestmentDetailViewModel } from './models/investment-detail-view.model';

@Component({
  selector: 'app-investment-detail-table',
  templateUrl: './investment-detail-table.component.html',
  styleUrls: ['./investment-detail-table.component.scss'],
})
export class InvestmentDetailTableComponent implements OnInit {
  segmentId!: string;
  viewModel$!: Observable<InvestmentDetailViewModel>;

  constructor(
    private formBuilder: FormBuilder,
    private segmentDataService: SegmentDataService,
    public modal: NgbActiveModal,
  ) {}

  ngOnInit() {
    this.viewModel$ = this.getViewModel();
  }

  private getViewModel(): Observable<InvestmentDetailViewModel> {
    return this.segmentDataService.getSegmentDetails(this.segmentId).pipe(
      map((segment) => ({
        segment,
        form: this.formBuilder.group({ investmentInput: [NaN] }),
        customInvestment: {
          investment: 0,
          breachProbability: NaN,
          ebis: NaN,
          enbis: NaN,
        },
      })),
      switchMap((viewModel) =>
        merge(
          of(viewModel),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          viewModel.form.get('investmentInput')!.valueChanges.pipe(
            debounceTime(500),
            filter((investment) => Number.isFinite(investment)),
            switchMap((investment) =>
              this.segmentDataService.getInvestmentDetails(
                this.segmentId,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                investment!,
              ),
            ),
            map((customInvestment) => ({ ...viewModel, customInvestment })),
          ),
        ),
      ),
    );
  }
}
