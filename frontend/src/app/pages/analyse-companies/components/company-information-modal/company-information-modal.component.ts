import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import {
  Company,
  Country,
  OrganizationSize,
} from '../../../../models/company.interface';
import { AnalyseCompaniesModalService } from '../../services/analyse-companies-modal.service';
import { getCompanyInformationInputs } from '../constants/company-information-config.constant';
import { CompanyInformationAnyInput } from '../models/company-information-input.interface';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@Component({
  selector: 'app-company-information-modal',
  templateUrl: './company-information-modal.component.html',
  styleUrls: ['./company-information-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
})
export class CompanyInformationModalComponent implements OnInit {
  viewModel$!: Observable<{
    inputs: CompanyInformationAnyInput[];
    form: FormGroup<{
      [x: string]: FormControl<null | undefined | number>;
    }>;
  }>;

  constructor(
    private activeModal: NgbActiveModal,
    private analyseCompaniesModalService: AnalyseCompaniesModalService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.viewModel$ = this.analyseCompaniesModalService.companyInformation.pipe(
      map((data) => data?.company),
      map((definedCompanyInformation) =>
        this.createForm(getCompanyInformationInputs, definedCompanyInformation),
      ),
    );
  }

  dismiss(): void {
    this.activeModal.close();
    this.analyseCompaniesModalService.setCompareCompany();
  }

  submit(
    form: FormGroup<{
      [x: string]: FormControl<null | undefined | number>;
    }>,
  ): void {
    this.activeModal.close();
    this.analyseCompaniesModalService.setCompareCompany(
      {
        revenue: form.controls['revenue'].value!,
        marketShare: form.controls['marketShare'].value!,
        growthRate: form.controls['growthRate'].value!,
        country: form.controls['country'].value! as unknown as Country,
        organizationSize: form.controls['organizationSize']
          .value! as unknown as OrganizationSize,
        remote: form.controls['remote'].value!,
        cybersecurityInvestment:
          form.controls['cybersecurityInvestment'].value!,
        cybersecurityBudget: form.controls['cybersecurityBudget'].value!,
        cybersecurityStaffing: form.controls['cybersecurityStaffing'].value!,
        cybersecurityTrainingInvestment:
          form.controls['cybersecurityTrainingInvestment'].value!,
        cybersecurityInsuranceInvestment:
          form.controls['cybersecurityInsuranceInvestment'].value!,
        cyberAttackThreats: form.controls['cyberAttackThreats'].value!,
        cloud: form.controls['cloud'].value!,
        multifactor: form.controls['multifactor'].value!,
        networkInfrastructure: form.controls['networkInfrastructure'].value!,
        remoteAccess: form.controls['remoteAccess'].value!,
      },
      form.controls['numberOfClosest'].value ?? undefined,
    );
  }

  private createForm(
    inputs: CompanyInformationAnyInput[],
    definedCompanyInformation?: Company,
  ) {
    const formControls = {
      ...inputs.reduce<{
        [x: string]: (
          | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
          | undefined
          | number
        )[];
      }>((pre, curr) => {
        return {
          ...pre,
          [curr.name]: [
            (definedCompanyInformation &&
              definedCompanyInformation[curr.name as keyof Company]) as number,
            curr.type === 'number'
              ? [
                  Validators.required,
                  Validators.min(curr.min),
                  Validators.max(curr.max),
                ]
              : [Validators.required],
          ],
        };
      }, {}),
      numberOfClosest: [undefined],
    };
    const form = this.formBuilder.group(formControls) as FormGroup;
    return { form, inputs };
  }
}
