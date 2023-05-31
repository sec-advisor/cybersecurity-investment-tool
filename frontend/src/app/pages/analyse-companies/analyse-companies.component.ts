import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap, merge } from 'rxjs';

import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { observeNotification } from 'rxjs/internal/Notification';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle,
  tooltip: ApexTooltip
};

@Component({
  selector: 'app-analyse-companies',
  templateUrl: './analyse-companies.component.html',
  styleUrls: ['./analyse-companies.component.scss']
})
export class AnalyseCompaniesComponent implements OnInit {

  private readonly selectedCompany = new Subject<any>();

  viewModel$!: Observable<any>;

  @ViewChild('eb') chartEb!: ChartComponent;
  @ViewChild('ee') chartEe!: ChartComponent;
  @ViewChild('et') chartEt!: ChartComponent;
  @ViewChild('pb') chartPb!: ChartComponent;
  @ViewChild('pe') chartPe!: ChartComponent;
  @ViewChild('pt') chartPt!: ChartComponent;

  constructor(private analyseCompaniesViewService: AnalyseCompaniesViewService) { }

  ngOnInit() {
    this.viewModel$ = this.analyseCompaniesViewService.getViewModel().pipe(
      // tap(x => console.log(x.data.map((o: any) => o['pearsonCorrelationBusiness' as keyof typeof o]))),
      tap(console.log),
      map(data => ({ data, viewModel: this.mapToChartModel(data) })),
      switchMap(({ data, viewModel }) => merge(
        of(viewModel),
        this.selectedCompany.pipe(tap(company => this.updateSeries(data, company)), map(() => viewModel))
      )),
    )
  }

  private updateSeries(data: any, company: any) {
    // const chartData = this.getChartValues(data, 'euclideanDistanceBusiness')
    // const distanceSelectedCompany = chartData.find((o: any) => o.id === company.id).distance

    try {
      [
        { component: this.chartEb, value: this.getChartValues(data, 'euclideanDistanceBusiness') },
        { component: this.chartEe, value: this.getChartValues(data, 'euclideanDistanceEconomic') },
        { component: this.chartEt, value: this.getChartValues(data, 'euclideanDistanceTechnical') },
        { component: this.chartPb, value: this.getChartValues(data, 'pearsonCorrelationBusiness') },
        { component: this.chartPe, value: this.getChartValues(data, 'pearsonCorrelationEconomic') },
        { component: this.chartPt, value: this.getChartValues(data, 'pearsonCorrelationTechnical') },
      ].forEach(object => {
        const distanceSelectedCompany = object.value.find((o: any) => o.id === company.id).distance

        // object.component.appendSeries({
        //   name: 'Selected Company',
        //   data: [{
        //     x: distanceSelectedCompany,
        //     y: 0.1,
        //     fillColor: '#f0b95f',
        //   }]
        // } as any)


        object.component.updateSeries([
          {
            name: 'Company Id',
            data: object.value.map((a: any) => ({
              x: a.distance,
              y: 0,
            }))

          }, {
            name: 'Selected Company',
            data: [{
              x: distanceSelectedCompany,
              y: 0.1,
              fillColor: '#f0b95f',
            }]
          }],
          false
        )
      })
    } catch (error) {

    }


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
        ...this.getBaseConfig(data, this.getChartValues(data, 'euclideanDistanceBusiness'), `Business Comparison Euclidean`),
      },
      euclideanDistanceEconomic: {
        ...this.getBaseConfig(data, this.getChartValues(data, 'euclideanDistanceEconomic'), 'Economic Comparison Euclidean'),
      },
      euclideanDistanceTechnical: {
        ...this.getBaseConfig(data, this.getChartValues(data, 'euclideanDistanceTechnical'), 'Technical Comparison Euclidean'),
      },
      pearsonCorrelationBusiness: {
        ...this.getBaseConfig(data, this.getChartValues(data, 'pearsonCorrelationBusiness'), `Business Comparison Pearson`, -1, 1, 9),
      },
      pearsonCorrelationEconomic: {
        ...this.getBaseConfig(data, this.getChartValues(data, 'pearsonCorrelationEconomic'), `Economic Comparison Pearson`, -1, 1, 9),
      },
      pearsonCorrelationTechnical: {
        ...this.getBaseConfig(data, this.getChartValues(data, 'pearsonCorrelationTechnical'), `Technical Comparison Pearson`, -1, 1, 9),

      }
    }

  }

  private getBaseConfig(data: any[], compareData: any[], title: string, min?: number, max?: number, tickAmount = 10): Partial<ChartOptions> {
    return {
      title: {
        text: title
      },
      series: [{
        name: 'Company Id',
        data: compareData.map((e: any) => e.distance).map((a: any) => ([a, 0])),
      }],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        },
        events: {
          dataPointSelection: (_event, _chartContext, opts) => {
            const id = compareData[opts.dataPointIndex].id
            const selectedCompany = this.findCompanyById(data, id);
            console.log(selectedCompany)
            this.selectedCompany.next(selectedCompany)
            // console.log(chartContext, opts)
            // console.log(opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex])
            // console.log(config.config.series[config.seriesIndex].name)
            // console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
          },

        }
      },
      xaxis: {
        min: min ?? 0,
        max: max,
        tickAmount,
        tooltip: { enabled: false },
        labels: {
          formatter: (value) => value
        },
      },
      yaxis: {
        max: 0.5,
        tickAmount: 2
      },
      tooltip: {
        y: {
          formatter: (_, opts) => {
            return compareData[opts.dataPointIndex].id
          }
        }
      }
    } as Partial<ChartOptions>

  }

  private getChartValues(data: any, property: string) {
    return data.data.filter((o: any) => Number.isFinite(o[property])).map((o: any) => ({ id: o.id as number, distance: o[property as keyof typeof o] as number }));
  }

  private findCompanyById(data: any, id: string) {
    return data.data.find((c: any) => c.id === id);
  }

}
