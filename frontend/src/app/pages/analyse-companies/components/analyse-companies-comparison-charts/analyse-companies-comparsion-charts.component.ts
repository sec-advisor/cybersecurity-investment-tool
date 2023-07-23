import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { BehaviorSubject, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';

import { Company } from '../../../../models/company.interface';
import { filterUndefined } from '../../../../operators/filter-undefined.operator';
import { AnalyseCompaniesViewService } from '../../services/analyse-companies-view.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-analyse-companies-comparsion-charts',
  templateUrl: './analyse-companies-comparison-charts.component.html',
  styleUrls: ['./analyse-companies-comparsion-charts.component.scss'],
})
export class AnalyseCompaniesComparisonChartsComponent
  implements OnInit, OnChanges
{
  private readonly selectedCompany = new Subject<any>();
  private readonly companySubject = new BehaviorSubject<Company | undefined>(
    undefined,
  );

  viewModel$!: Observable<{ graphicData: any; selectedCompany?: any }>;

  @Input() company!: Company;

  @ViewChild('eb') chartEb!: ChartComponent;
  @ViewChild('ee') chartEe!: ChartComponent;
  @ViewChild('et') chartEt!: ChartComponent;
  @ViewChild('pb') chartPb!: ChartComponent;
  @ViewChild('pe') chartPe!: ChartComponent;
  @ViewChild('pt') chartPt!: ChartComponent;

  constructor(
    private analyseCompaniesViewService: AnalyseCompaniesViewService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['company'].currentValue) {
      this.companySubject.next(this.company);
    }
  }

  ngOnInit() {
    this.viewModel$ = this.companySubject.pipe(
      filterUndefined(),
      switchMap((company) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.analyseCompaniesViewService.getViewModel(company!),
      ),
      map((data) => ({ data, viewModel: this.mapToChartModel(data) })),
      switchMap(({ data, viewModel }) =>
        merge(
          of({ selectedCompany: undefined, graphicData: viewModel }),
          this.selectedCompany.pipe(
            tap((company) => this.updateSeries(data, company)),
            map((company) => ({
              selectedCompany: company,
              graphicData: viewModel,
            })),
          ),
        ),
      ),
    );
  }

  private updateSeries(data: any, company: any) {
    // const chartData = this.getChartValues(data, 'euclideanDistanceBusiness')
    // const distanceSelectedCompany = chartData.find((o: any) => o.id === company.id).distance

    try {
      [
        {
          component: this.chartEb,
          value: this.getChartValues(data, 'euclideanDistanceBusiness'),
        },
        {
          component: this.chartEe,
          value: this.getChartValues(data, 'euclideanDistanceEconomic'),
        },
        {
          component: this.chartEt,
          value: this.getChartValues(data, 'euclideanDistanceTechnical'),
        },
        {
          component: this.chartPb,
          value: this.getChartValues(data, 'pearsonCorrelationBusiness'),
        },
        {
          component: this.chartPe,
          value: this.getChartValues(data, 'pearsonCorrelationEconomic'),
        },
        {
          component: this.chartPt,
          value: this.getChartValues(data, 'pearsonCorrelationTechnical'),
        },
      ].forEach((object) => {
        const distanceSelectedCompany = object.value.find(
          (o: any) => o.id === company.id,
        ).distance;

        // object.component.appendSeries({
        //   name: 'Selected Company',
        //   data: [{
        //     x: distanceSelectedCompany,
        //     y: 0.1,
        //     fillColor: '#f0b95f',
        //   }]
        // } as any)

        object.component.updateSeries(
          [
            {
              name: 'Company Id',
              data: object.value.map((a: any) => ({
                x: a.distance,
                y: 0,
              })),
            },
            {
              name: 'Selected Company',
              data: [
                {
                  x: distanceSelectedCompany,
                  y: 0.1,
                },
              ],
            },
          ],
          false,
        );
      });
    } catch (error) {}

    // const series = [...this.chartEb.series, {
    //   name: 'Selected Company',
    //   data: [{
    //     x: distanceSelectedCompany,
    //     y: 0.1,
    //     fillColor: '#f0b95f',
    //   }]
    // }] as ApexAxisChartSeries

    // this.chartEb.updateSeries(series)

    // this.chartEb.updateSeries([
    //   {
    //     name: 'Company Id',
    //     data: chartData.map((a: any) => ({
    //       x: a.distance,
    //       y: 0,
    //     }))

    //   }, {
    //     name: 'Selected Company',
    //     data: [{
    //       x: distanceSelectedCompany,
    //       y: 0.1,
    //       fillColor: '#f0b95f',
    //     }]
    //   }], false)
  }

  private mapToChartModel(data: any) {
    return {
      euclideanDistanceBusiness: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'euclideanDistanceBusiness'),
          `Business Comparison Euclidean`,
        ),
      },
      euclideanDistanceEconomic: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'euclideanDistanceEconomic'),
          'Economic Comparison Euclidean',
        ),
      },
      euclideanDistanceTechnical: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'euclideanDistanceTechnical'),
          'Technical Comparison Euclidean',
        ),
      },
      pearsonCorrelationBusiness: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'pearsonCorrelationBusiness'),
          `Business Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
      pearsonCorrelationEconomic: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'pearsonCorrelationEconomic'),
          `Economic Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
      pearsonCorrelationTechnical: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(data, 'pearsonCorrelationTechnical'),
          `Technical Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
    };
  }

  private getBaseConfig(
    data: any[],
    compareData: any[],
    title: string,
    min?: number,
    max?: number,
    tickAmount = 10,
  ): Partial<ChartOptions> {
    return {
      title: {
        text: title,
      },
      series: [
        {
          name: 'Company Id',
          data: compareData.map((e: any) => e.distance).map((a: any) => [a, 0]),
        },
      ],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy',
        },
        events: {
          dataPointSelection: (_event, _chartContext, opts) => {
            const id = compareData[opts.dataPointIndex].id;
            const selectedCompany = this.findCompanyById(data, id);
            console.log(selectedCompany);
            this.selectedCompany.next(selectedCompany);
            // console.log(chartContext, opts)
            // console.log(opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex])
            // console.log(config.config.series[config.seriesIndex].name)
            // console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
          },
        },
      },
      xaxis: {
        min: min ?? 0,
        max: max,
        tickAmount,
        tooltip: { enabled: false },
        labels: {
          formatter: (value) => value,
        },
      },
      yaxis: {
        max: 0.5,
        tickAmount: 2,
      },
      tooltip: {
        y: {
          formatter: (_, opts) => {
            return compareData[opts.dataPointIndex].id;
          },
        },
      },
    } as Partial<ChartOptions>;
  }

  private getChartValues(data: any, property: string) {
    return data.data
      .filter((o: any) => Number.isFinite(o[property]))
      .map((o: any) => ({
        id: o.id as number,
        distance: o[property as keyof typeof o] as number,
      }));
  }

  private findCompanyById(data: any, id: string) {
    return data.data.find((c: any) => c.id === id);
  }
}
