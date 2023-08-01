import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { LayoutsModule } from '../../layouts/layouts.module';
import { AnalyseCompaniesComponent } from './analyse-companies.component';
import {
  AnalyseCompaniesComparisonChartsComponent
} from './components/analyse-companies-comparison-charts/analyse-companies-comparsion-charts.component';
import {
  AnalyseCompaniesComparisonTableComponent
} from './components/analyse-companies-comparison-table/analyse-companies-comparison-table.component';
import {
  AnalyseCompaniesInstructionComponent
} from './components/analyse-companies-instruction/analyse-companies-instruction.component';
import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ],
  providers: [AnalyseCompaniesViewService],
  declarations: [
    AnalyseCompaniesComponent,
    AnalyseCompaniesComparisonChartsComponent,
    AnalyseCompaniesComparisonTableComponent,
    AnalyseCompaniesInstructionComponent,
  ],
})
export class AnalyseCompaniesModule {}
