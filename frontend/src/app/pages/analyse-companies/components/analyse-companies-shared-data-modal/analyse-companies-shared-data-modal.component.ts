import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CloudEnum,
  Company,
  CompanyRawData,
  CyberAttackThreats,
  Multifactor,
  NetworkInfrastructure,
  RemoteAccess,
  SharedCompanyData,
  countryDistanceMapping,
  organizationSizeMapping,
} from '../../../../models/company.interface';

interface TableRow {
  key: string;
  compareCompanyValue: string;
  companyValue: string;
  averageValue: string;
}

@Component({
  selector: 'app-analyse-companies-shared-data-modal',
  templateUrl: './analyse-companies-shared-data-modal.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AnalyseCompaniesSharedDataModalComponent implements OnInit {
  readonly compareCompanyInformation!: {
    company: SharedCompanyData;
    average: SharedCompanyData;
  };
  readonly companyInformation!: Company;
  viewModel!: TableRow[];

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    // this.companyInformation.organizationSize = Object.entries(
    //   organizationSizeMapping,
    // ).find(
    //   ([key, value]) =>
    //     value ===
    //     (this.companyInformation.organizationSize as unknown as number),
    // )?.[0] as unknown as string;

    this.viewModel = Object.entries(this.compareCompanyInformation.company).map(
      ([key, value]) => ({
        key: this.getDisplayKey(key),
        compareCompanyValue: this.getDisplayValue(
          key as keyof SharedCompanyData,
          value,
        ),
        companyValue: this.getDisplayValue(
          key as keyof CompanyRawData,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.companyInformation[key as keyof Company],
        ),
        averageValue: this.getDisplayValue(
          key as keyof CompanyRawData,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.compareCompanyInformation.average[
            key as keyof SharedCompanyData
          ],
        ),
      }),
    );
  }

  dismiss(): void {
    this.activeModal.close();
  }

  isNumber(value: any): boolean {
    return Number.isFinite(+value);
  }

  private getDisplayValue(
    key: keyof CompanyRawData,
    value?:
      | string
      | number
      | CyberAttackThreats
      | NetworkInfrastructure
      | RemoteAccess
      | CloudEnum
      | Multifactor,
  ): string {
    if (key === 'cyberAttackThreats') {
      return CyberAttackThreats[value as unknown as CyberAttackThreats];
    } else if (key === 'networkInfrastructure') {
      return NetworkInfrastructure[value as unknown as NetworkInfrastructure];
    } else if (key === 'remoteAccess') {
      return RemoteAccess[value as unknown as RemoteAccess];
    } else if (key === 'cloud') {
      return CloudEnum[value as unknown as CloudEnum];
    } else if (key === 'multifactor') {
      return Multifactor[value as unknown as Multifactor];
    } else if (key === 'organizationSize') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return Object.entries(organizationSizeMapping)
        .find(([_key, value]) => value === value)![0]
        .toString();
    } else if (key === 'country' && Number.isFinite(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return Object.entries(countryDistanceMapping)
        .find((_key, value) => value === value)![0]
        .toString();
    } else if (
      (key === 'remote' || key === 'marketShare' || key === 'growthRate') &&
      Number.isFinite(value)
    ) {
      return `${value}%`;
    } else if (typeof value === 'string') {
      if (value.startsWith('[')) {
        return value
          .replaceAll('[', '')
          .replaceAll(']', '')
          .replaceAll(`'`, '');
      } else {
        return value;
      }
    } else if (Number.isFinite(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return value!.toString();
    }
    return '';
  }

  private getDisplayKey(key: string): string {
    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
