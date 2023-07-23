import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { LayoutsModule } from '../../layouts/layouts.module';
import { AnalyseCompaniesComponent } from './analyse-companies.component';
import {
  AnalyseCompaniesComparisonChartsComponent
} from './components/analyse-companies-comparison-charts/analyse-companies-comparsion-charts.component';
import {
  AnalyseCompaniesInstructionComponent
} from './components/analyse-companies-instruction/analyse-companies-instruction.component';
import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';

@NgModule({
  imports: [CommonModule, LayoutsModule, NgApexchartsModule],
  providers: [AnalyseCompaniesViewService],
  declarations: [
    AnalyseCompaniesComponent,
    AnalyseCompaniesComparisonChartsComponent,
    AnalyseCompaniesInstructionComponent,
  ],
})
export class AnalyseCompaniesModule {}
