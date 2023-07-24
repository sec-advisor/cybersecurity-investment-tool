import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { filter, map, merge, Observable, of } from 'rxjs';

import { Company } from '../../models/company.interface';
import { AnalyseCompaniesModalService } from './services/analyse-companies-modal.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-analyse-companies',
  templateUrl: './analyse-companies.component.html',
  styleUrls: ['./analyse-companies.component.scss'],
})
export class AnalyseCompaniesComponent implements OnInit {
  viewModel$!: Observable<{
    companyDetail?: { company: Company; numberOfClosest?: number };
    showIntroduction: boolean;
  }>;

  @ViewChild('eb') chartEb!: ChartComponent;
  @ViewChild('ee') chartEe!: ChartComponent;
  @ViewChild('et') chartEt!: ChartComponent;
  @ViewChild('pb') chartPb!: ChartComponent;
  @ViewChild('pe') chartPe!: ChartComponent;
  @ViewChild('pt') chartPt!: ChartComponent;

  constructor(
    private analyseCompaniesModalService: AnalyseCompaniesModalService,
  ) {}

  ngOnInit() {
    this.viewModel$ = merge(
      of({ showIntroduction: true }),
      this.analyseCompaniesModalService.companyInformation.pipe(
        filter((data) => !!data?.company),
        map((data) => ({
          companyDetail: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            company: data!.company!,
            numberOfClosest: data?.numberOfClosest,
          },
          showIntroduction: false,
        })),
      ),
    );
  }

  showModal(): void {
    this.analyseCompaniesModalService.showModal();
  }
}
