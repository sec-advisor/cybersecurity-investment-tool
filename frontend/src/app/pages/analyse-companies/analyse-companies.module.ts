import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnalyseCompaniesComponent } from './analyse-companies.component';
import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AnalyseCompaniesViewService],
  declarations: [AnalyseCompaniesComponent]
})
export class AnalyseCompaniesModule { }
