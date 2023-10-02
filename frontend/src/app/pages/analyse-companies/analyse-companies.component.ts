import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { filter, map, merge, Observable, of, Subject, switchMap } from 'rxjs';

import { SideBarSection } from '../../layouts/action-sidebar/models/side-bar-button.model';
import { Company } from '../../models/company.interface';
import { AnalyseCompaniesSharedDataModalComponent } from './components/analyse-companies-shared-data-modal/analyse-companies-shared-data-modal.component';
import { AnalyseCompaniesModalService } from './services/analyse-companies-modal.service';
import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

enum Views {
  Chart,
  Table,
}

@Component({
  selector: 'app-analyse-companies',
  templateUrl: './analyse-companies.component.html',
  styleUrls: ['./analyse-companies.component.scss'],
})
export class AnalyseCompaniesComponent implements OnInit {
  private readonly viewSubject = new Subject<Views>();

  readonly views = Views;
  compareCompanyId?: string;
  viewModel$!: Observable<{
    companyDetail?: { company: Company; numberOfClosest?: number };
    showIntroduction: boolean;
    sidebarSections: SideBarSection[];
    view: Views;
  }>;

  constructor(
    private analyseCompaniesModalService: AnalyseCompaniesModalService,
    private analyseCompaniesViewService: AnalyseCompaniesViewService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.viewModel$ = merge(
      of({
        showIntroduction: true,
        sidebarSections: this.getSideBarActions(),
        view: Views.Chart,
      }),
      this.analyseCompaniesModalService.companyInformation.pipe(
        filter((data) => !!data?.company),
        map((data) => ({
          companyDetail: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            company: data!.company!,
            numberOfClosest: data?.numberOfClosest,
          },
          showIntroduction: false,
          sidebarSections: this.getSideBarActions(),
          view: Views.Chart,
        })),
      ),
    ).pipe(
      switchMap((viewModel) =>
        merge(
          of(viewModel),
          this.viewSubject.pipe(map((view) => ({ ...viewModel, view }))),
        ),
      ),
    );
  }

  showModal(): void {
    this.analyseCompaniesModalService.showModal();
  }

  showSharedData(compareCompanyId?: string): void {
    if (compareCompanyId) {
      this.analyseCompaniesViewService
        .getSharedCompanyData(Number(compareCompanyId))
        .pipe(
          switchMap((sharedCompanyData) =>
            this.analyseCompaniesModalService.companyInformation.pipe(
              map((companyInformation) => ({
                sharedCompanyData,
                companyInformation,
              })),
            ),
          ),
        )
        .subscribe(({ sharedCompanyData, companyInformation }) => {
          const modalRef = this.modalService.open(
            AnalyseCompaniesSharedDataModalComponent,
            { backdrop: 'static', keyboard: false, centered: true, size: 'lg' },
          );
          modalRef.componentInstance.compareCompanyInformation =
            sharedCompanyData;
          modalRef.componentInstance.companyInformation =
            companyInformation?.company;
        });
    }
  }

  handleCompareCompanySelection(companyId: string): void {
    this.compareCompanyId = companyId;
  }

  private getSideBarActions(): SideBarSection[] {
    return [
      {
        heading: { text: 'Company Comparison', icon: 'bi-building' },
        buttons: [
          {
            text: 'Chart View',
            icon: 'bi-file-earmark-bar-graph-fill',
            action: () => this.viewSubject.next(Views.Chart),
          },
          {
            text: 'Table View',
            icon: 'bi-table',
            action: () => this.viewSubject.next(Views.Table),
          },
        ],
      },
    ];
  }
}
