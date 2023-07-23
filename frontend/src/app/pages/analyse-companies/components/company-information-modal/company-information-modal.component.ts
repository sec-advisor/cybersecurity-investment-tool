/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import { Company, Country, OrganizationSize } from '../../../../models/company.interface';
import { AnalyseCompaniesModalService } from '../../services/analyse-companies-modal.service';
import { getCompanyInformationInputs } from '../constants/company-information-config.constant';
import { CompanyInformationAnyInput } from '../models/company-information-input.interface';

@Component({
  selector: 'app-company-information-modal',
  templateUrl: './company-information-modal.component.html',
  styleUrls: ['./company-information-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    this.analyseCompaniesModalService.setCompareCompany({
      revenue: form.controls['revenue'].value!,
      marketShare: form.controls['marketShare'].value!,
      growthRate: form.controls['growthRate'].value!,
      country: form.controls['country'].value! as unknown as Country,
      organizationSize: form.controls['organizationSize']
        .value! as unknown as OrganizationSize,
      remote: form.controls['remote'].value!,
      cybersecurityInvestment: form.controls['cybersecurityInvestment'].value!,
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
    });
  }

  private createForm(
    inputs: CompanyInformationAnyInput[],
    definedCompanyInformation?: Company,
  ) {
    const formControls = inputs.reduce<{
      [x: string]: (
        | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
        | undefined
        | number
      )[];
    }>((pre, curr) => {
      return {
        ...pre,
        [curr.name]: [
          ((definedCompanyInformation &&
            definedCompanyInformation[curr.name as keyof Company]) as number) ??
            1,
          [Validators.required],
        ],
      };
    }, {});
    const form = this.formBuilder.group(formControls);
    return { form, inputs };

    // const k = this.formBuilder.group({ test: undefined });

    // const a = this.formBuilder.group({
    //   revenue: [undefined, [Validators.required]],
    //   marketShare: [undefined, [Validators.required]],
    //   growthRate: [undefined, [Validators.required]],
    //   country: [undefined, [Validators.required]],
    //   organizationSize: [undefined, [Validators.required]],
    //   remote: [undefined, [Validators.required]],
    //   cybersecurityInvestment: [undefined, [Validators.required]],
    //   cybersecurityBudget: [undefined, [Validators.required]],
    //   cybersecurityStaffing: [undefined, [Validators.required]],
    //   cybersecurityTrainingInvestment: [undefined, [Validators.required]],
    //   cybersecurityInsuranceInvestment: [undefined, [Validators.required]],
    //   cyberAttackThreats: [undefined, [Validators.required]],
    //   cloud: [undefined, [Validators.required]],
    //   multifactor: [undefined, [Validators.required]],
    //   networkInfrastructure: [undefined, [Validators.required]],
    //   remoteAccess: [undefined, [Validators.required]],
    // });
  }
}
