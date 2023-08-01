import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, merge, Observable, of, switchMap, tap } from 'rxjs';

import { Company, CompanyComparisonDto, CompanyDto } from '../../../../models/company.interface';
import { AnalyseCompaniesViewService } from '../../services/analyse-companies-view.service';
import {
  AnalyseCompaniesSharedDataModalComponent
} from '../analyse-companies-shared-data-modal/analyse-companies-shared-data-modal.component';

@Component({
  selector: 'app-analyse-companies-comparison-table',
  templateUrl: './analyse-companies-comparison-table.component.html',
})
export class AnalyseCompaniesComparisonTableComponent implements OnInit {
  private readonly selectedAreaSubject = new BehaviorSubject<string>(
    'eBusiness',
  );

  readonly areaSelection = [
    { key: 'eBusiness', value: 'Euclidean Business' },
    { key: 'eEconomic', value: 'Euclidean Economic' },
    { key: 'eTechnical', value: 'Euclidean Technical' },
    { key: 'pBusiness', value: 'Pearson Business' },
    { key: 'pEconomic', value: 'Pearson Economic' },
    { key: 'pTechnical', value: 'Pearson Technical' },
  ];
  form!: FormGroup<{
    areaSelection: FormControl<string | null>;
  }>;
  viewModel$!: Observable<CompanyDto[]>;

  @Input() companyDetail!: { company: Company; numberOfClosest?: number };

  constructor(
    private analyseCompaniesViewService: AnalyseCompaniesViewService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({ areaSelection: ['eBusiness'] });

    this.viewModel$ = this.analyseCompaniesViewService
      .getViewModel(
        this.companyDetail.company,
        this.companyDetail.numberOfClosest,
      )
      .pipe(
        switchMap((companyDto) =>
          this.selectedAreaSubject.pipe(
            map((area) => this.getPropertyByArea(companyDto, area)),
          ),
        ),
        // map((companyDto) => companyDto.euclideanDistanceEconomic),
        switchMap((viewModel) =>
          merge(
            of(viewModel),
            this.handleFormChanges().pipe(map(() => viewModel)),
          ),
        ),
      );
  }

  handleFormChanges() {
    return this.form.controls.areaSelection.valueChanges.pipe(
      tap((value) => {
        if (value) {
          this.selectedAreaSubject.next(value);
        }
      }),
    );
  }

  showSharedData(companyId: number): void {
    this.analyseCompaniesViewService
      .getSharedCompanyData(companyId)
      .subscribe((companyData) => {
        const modalRef = this.modalService.open(
          AnalyseCompaniesSharedDataModalComponent,
          { backdrop: 'static', keyboard: false, centered: true, size: 'lg' },
        );
        modalRef.componentInstance.compareCompanyInformation = companyData;
        modalRef.componentInstance.companyInformation =
          this.companyDetail.company;
      });
  }

  private getPropertyByArea(
    viewModel: CompanyComparisonDto,
    area: string,
  ): CompanyDto[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      eBusiness: viewModel.euclideanDistanceBusiness,
      eEconomic: viewModel.euclideanDistanceEconomic,
      eTechnical: viewModel.euclideanDistanceTechnical,
      pBusiness: viewModel.pearsonCorrelationBusiness,
      pEconomic: viewModel.pearsonCorrelationEconomic,
      pTechnical: viewModel.pearsonCorrelationTechnical,
    }[area]!;
  }
}
