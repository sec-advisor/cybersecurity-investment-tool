import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscriber, switchMap } from 'rxjs';

import { LeadingPeriod, ROSIDetail } from '../../../../libs/api-interfaces';
import { AppSegment } from '../../models/app-segment.model';
import { StorageService } from '../../services/storage.service';
import { RosiModalComponent } from '../rosi-modal/rosi-modal.component';

@Component({
  selector: 'app-recommendation-presenter',
  templateUrl: './recommendation-presenter.component.html',
  styleUrls: ['./recommendation-presenter.component.scss']
})
export class RecommendationPresenterComponent implements OnDestroy {

  private readonly subscriber = new Subscriber();

  @Input() segment?: AppSegment;

  @ViewChild(RosiModalComponent) rosiModal?: RosiModalComponent;

  constructor(
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
  ) { }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  getImage(image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  showModal(recommendationData: any): void {
    if (this.segment) {
      this.subscriber.add(this.rosiModal?.showModal({
        price: recommendationData.price,
        leasingPeriod: this.getLeasingPeriod(recommendationData.leasingPeriod),
        mitigationRate: recommendationData.mitigationRate,
        costOfIncident: this.segment.value,
      } as Partial<ROSIDetail>).pipe(
        switchMap(calculatedROSIDetail => this.storageService.updateSegment({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...this.segment!,
          recommendations: this.segment?.recommendations?.map(recommendation => ({
            ...recommendation,
            rosi: recommendation.data.id === recommendationData.id ? calculatedROSIDetail.rosi : recommendation.rosi
          }))
        },
          false))
      ).subscribe());
    }
  }

  private getLeasingPeriod(period: string): LeadingPeriod {
    const mappedEnum = [
      { stringValue: 'MINUTES', enum: LeadingPeriod.Minutes },
      { stringValue: 'DAYS', enum: LeadingPeriod.Days },
      { stringValue: 'MONTHS', enum: LeadingPeriod.Months }
    ].find(({ stringValue }) => stringValue === period)?.enum;

    if (mappedEnum !== undefined) {
      return mappedEnum
    } else {
      throw Error('Could not map leasing period');
    }
  }

}
