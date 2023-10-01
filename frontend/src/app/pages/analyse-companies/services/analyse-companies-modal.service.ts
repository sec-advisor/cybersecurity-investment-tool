import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, from } from 'rxjs';

import { Company } from '../../../models/company.interface';
import { CompanyInformationModalComponent } from '../components/company-information-modal/company-information-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AnalyseCompaniesModalService {
  private readonly companySubject = new BehaviorSubject<
    { company?: Company | undefined; numberOfClosest?: number } | undefined
  >(undefined);

  readonly companyInformation = this.companySubject.asObservable();

  constructor(private modal: NgbModal) {}

  showModal() {
    return from(
      this.modal.open(CompanyInformationModalComponent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
        size: 'lg',
      }).result,
    );
  }

  setCompareCompany(company?: Company, numberOfClosest?: number): void {
    if (company) {
      this.companySubject.next({ company, numberOfClosest });
    }
  }
}
