import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SegmentOverviewComponent } from './segment-overview/segment-overview.component';
import { SegmentPresenterComponent } from './segment-presenter.component';
import { SegmentRegistratorComponent } from './segment-registrator/segment-registrator.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [SegmentPresenterComponent, SegmentRegistratorComponent, SegmentOverviewComponent],
  exports: [SegmentPresenterComponent]
})
export class SegmentPresenterModule { }
