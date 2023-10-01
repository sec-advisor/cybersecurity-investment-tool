import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {
  BehaviorSubject,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import {
  Company,
  CompanyComparisonDto,
  CompanyDto,
} from '../../../../models/company.interface';
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
  private readonly selectedCompany = new Subject<CompanyDto>();
  private readonly companyDetailSubject = new BehaviorSubject<
    { company: Company; numberOfClosest?: number } | undefined
  >(undefined);

  viewModel$!: Observable<{ graphicData: any; selectedCompany?: any }>;

  @Input() companyDetail!: { company: Company; numberOfClosest?: number };

  @Output() companyIdSelected = new EventEmitter<string>();

  @ViewChild('eb') chartEb!: ChartComponent;
  @ViewChild('ee') chartEe!: ChartComponent;
  @ViewChild('et') chartEt!: ChartComponent;
  @ViewChild('pb') chartPb!: ChartComponent;
  @ViewChild('pe') chartPe!: ChartComponent;
  @ViewChild('pt') chartPt!: ChartComponent;

  constructor(
    private analyseCompaniesViewService: AnalyseCompaniesViewService,
    private ngZone: NgZone,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyDetail'].currentValue) {
      this.companyDetailSubject.next(this.companyDetail);
    }
  }

  ngOnInit() {
    this.viewModel$ = this.companyDetailSubject.pipe(
      filterUndefined(),
      switchMap((companyDetail) =>
        this.analyseCompaniesViewService.getViewModel(
          companyDetail.company,
          companyDetail.numberOfClosest,
        ),
      ),
      map((data) => ({ data, viewModel: this.mapToChartModel(data) })),
      switchMap(({ data, viewModel }) =>
        merge(
          of({ selectedCompany: undefined, graphicData: viewModel }),
          this.selectedCompany.pipe(
            filterUndefined(),
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

  private updateSeries(data: CompanyComparisonDto, company: CompanyDto) {
    // const chartData = this.getChartValues(data, 'euclideanDistanceBusiness')
    // const distanceSelectedCompany = chartData.find((o: any) => o.id === company.id).distance

    try {
      [
        {
          component: this.chartEb,
          value: this.getChartValues(
            data.euclideanDistanceBusiness,
            'euclideanDistanceBusiness',
          ),
        },
        {
          component: this.chartEe,
          value: this.getChartValues(
            data.euclideanDistanceEconomic,
            'euclideanDistanceEconomic',
          ),
        },
        {
          component: this.chartEt,
          value: this.getChartValues(
            data.euclideanDistanceTechnical,
            'euclideanDistanceTechnical',
          ),
        },
        {
          component: this.chartPb,
          value: this.getChartValues(
            data.pearsonCorrelationBusiness,
            'pearsonCorrelationBusiness',
          ),
        },
        {
          component: this.chartPe,
          value: this.getChartValues(
            data.pearsonCorrelationEconomic,
            'pearsonCorrelationEconomic',
          ),
        },
        {
          component: this.chartPt,
          value: this.getChartValues(
            data.pearsonCorrelationTechnical,
            'pearsonCorrelationTechnical',
          ),
        },
      ].forEach((object) => {
        const distanceSelectedCompany = object.value.find(
          (o: any) => o.id === company.id,
        )?.distance;

        // object.component.appendSeries({
        //   name: 'Selected Company',
        //   data: [{
        //     x: distanceSelectedCompany,
        //     y: 0.1,
        //     fillColor: '#f0b95f',
        //   }]
        // } as any)

        const selectedCompanySerie = {
          name: 'Selected Company',
          data: [
            {
              x: distanceSelectedCompany,
              y: 0.1,
            },
          ],
        };

        let series = [
          {
            name: 'Company Id',
            data: object.value.map((a: any) => ({
              x: a.distance,
              y: 0,
            })),
          },
        ];

        series = distanceSelectedCompany
          ? [...series, selectedCompanySerie]
          : series;

        object.component.updateSeries(series, false);
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

  private mapToChartModel(data: CompanyComparisonDto) {
    return {
      euclideanDistanceBusiness: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.euclideanDistanceBusiness,
            'euclideanDistanceBusiness',
          ),
          `Business Comparison Euclidean`,
        ),
      },
      euclideanDistanceEconomic: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.euclideanDistanceEconomic,
            'euclideanDistanceEconomic',
          ),
          'Economic Comparison Euclidean',
        ),
      },
      euclideanDistanceTechnical: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.euclideanDistanceTechnical,
            'euclideanDistanceTechnical',
          ),
          'Technical Comparison Euclidean',
        ),
      },
      pearsonCorrelationBusiness: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.pearsonCorrelationBusiness,
            'pearsonCorrelationBusiness',
          ),
          `Business Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
      pearsonCorrelationEconomic: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.pearsonCorrelationEconomic,
            'pearsonCorrelationEconomic',
          ),
          `Economic Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
      pearsonCorrelationTechnical: {
        ...this.getBaseConfig(
          data,
          this.getChartValues(
            data.pearsonCorrelationTechnical,
            'pearsonCorrelationTechnical',
          ),
          `Technical Comparison Pearson`,
          -1,
          1,
          9,
        ),
      },
    };
  }

  private getBaseConfig(
    companies: CompanyComparisonDto,
    compareData: { id: number; distance: number }[],
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
          data: compareData
            .map((company) => company.distance)
            .map((a: any) => [a, 0]),
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
            const id = compareData[opts.dataPointIndex].id.toString();
            const selectedCompany = this.findCompanyById(companies, id);
            if (selectedCompany) {
              this.ngZone.run(() => {
                this.selectedCompany.next(selectedCompany);
                this.companyIdSelected.emit(id);
              });
            }
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
            return compareData[opts.dataPointIndex].id.toString();
          },
        },
      },
    } as Partial<ChartOptions>;
  }

  private getChartValues(
    companies: CompanyDto[],
    property: keyof CompanyDto,
  ): { id: number; distance: number }[] {
    return companies
      .filter((company: CompanyDto) => Number.isFinite(company[property]))
      .map((company: CompanyDto) => ({
        id: company.id,
        distance: company[property],
      }));
  }

  private findCompanyById(
    companies: CompanyComparisonDto,
    id: string,
  ): CompanyDto | undefined {
    const allCompanies = [
      ...companies.euclideanDistanceBusiness,
      ...companies.euclideanDistanceEconomic,
      ...companies.euclideanDistanceTechnical,
      ...companies.pearsonCorrelationBusiness,
      ...companies.pearsonCorrelationEconomic,
      ...companies.pearsonCorrelationTechnical,
    ];

    return allCompanies.find((company) => company.id.toString() === id);
  }
}
