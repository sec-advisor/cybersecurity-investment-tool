import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutsModule } from '../../layouts/layouts.module';
import { ActionBoardComponent } from './action-board/action-board.component';
import { InvestmentDetailTableComponent } from './investment-detail-table/investment-detail-table.component';
import { SegmentDetailTableComponent } from './segment-detail-table/segment-detail-table.component';
import { SegmentOverviewTableComponent } from './segment-overview-table/segment-overview-table.component';
import { SegmentOverviewComponent } from './segment-overview/segment-overview.component';
import { SegmentPresenterComponent } from './segment-presenter.component';
import { SegmentRegistratorComponent } from './segment-registrator/segment-registrator.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbModule, LayoutsModule],
  declarations: [
    SegmentPresenterComponent,
    SegmentRegistratorComponent,
    SegmentOverviewComponent,
    ActionBoardComponent,
    SegmentDetailTableComponent,
    SegmentOverviewTableComponent,
    InvestmentDetailTableComponent,
  ],
  exports: [SegmentPresenterComponent],
})
export class SegmentPresenterModule {}
