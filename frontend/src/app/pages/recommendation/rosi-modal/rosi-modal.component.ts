import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, filter, from, Observable, of, switchMap } from 'rxjs';

import { ROSIDetail } from '../../../../../libs/api-interfaces';
import { RecommendationDataService } from '../../../services/backend/recommendation-data.service';

@Component({
  selector: 'app-rosi-modal',
  templateUrl: './rosi-modal.component.html',
  styleUrls: ['./rosi-modal.component.scss'],
})
export class RosiModalComponent {
  private rosiDetail?: Partial<ROSIDetail>;

  form?: FormGroup;

  @ViewChild('modal', { static: true }) modal?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private recommendationDataService: RecommendationDataService,
  ) {}

  showModal(rosiDetail: Partial<ROSIDetail>): Observable<ROSIDetail> {
    this.rosiDetail = rosiDetail;
    this.form = this.formBuilder.group({
      mitigationRate: [
        (rosiDetail.mitigationRate || 0) * 100,
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      costOfIncident: [
        rosiDetail.costOfIncident,
        [Validators.required, Validators.min(1)],
      ],
      incidenceOccurrence: [
        undefined,
        [Validators.required, Validators.min(1)],
      ],
    });

    return from(this.modalService.open(this.modal).result).pipe(
      switchMap(() =>
        this.recommendationDataService.calculateROSI(this.getFormValues()),
      ),
      catchError(() => of(undefined as unknown as ROSIDetail)),
      filter((rosiDetail) => !!rosiDetail),
    );
  }

  isControlInvalid(control: AbstractControl | null): boolean {
    if (control) {
      return control.invalid && control.dirty;
    }
    return false;
  }

  private getFormValues(): ROSIDetail {
    if (this.rosiDetail?.price && this.rosiDetail.leasingPeriod) {
      return {
        price: this.rosiDetail?.price,
        leasingPeriod: this.rosiDetail?.leasingPeriod,
        mitigationRate: this.form?.get('mitigationRate')?.value / 100,
        costOfIncident: this.form?.get('costOfIncident')?.value,
        incidenceOccurrence: this.form?.get('incidenceOccurrence')?.value,
      };
    } else {
      throw Error('Values of rosi details are undefined');
    }
  }
}
