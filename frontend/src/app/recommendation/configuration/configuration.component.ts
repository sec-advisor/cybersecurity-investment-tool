import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessProfile, RecommendationProfile, Segment, SegmentDefinition } from '@app/api/api-interfaces';
import { first, forkJoin, map, Observable, Subject, switchMap } from 'rxjs';

import { regions } from '../../constants/regions.constant';
import { AppSegment } from '../../models/app-segment.model';
import { RecommendationDataService } from '../../services/backend/recommendation-data.service';
import { SegmentDefinitionDataService } from '../../services/backend/segment-definition-data.service';
import { StorageService } from '../../services/storage.service';
import { ConfigurationViewModel } from '../models/configuration-view.model';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnChanges {

  private segmentSource$: Subject<Segment> = new Subject();

  readonly leasingPeriod: { label: string, value: string }[] = [
    {
      label: 'Minutes',
      value: 'MINUTES',
    }, {
      label: 'Hours',
      value: 'HOURS',
    }, {
      label: 'Days',
      value: 'DAYS',
    }, {
      label: 'Weeks',
      value: 'WEEKS',
    }, {
      label: 'Months',
      value: 'MONTHS',
    },
  ];
  readonly deploymentTime: { label: string, value: string }[] = [
    {
      label: 'Seconds',
      value: 'SECONDS',
    },
    {
      label: 'Minutes',
      value: 'MINUTES',
    }, {
      label: 'Hours',
      value: 'HOURS',
    }, {
      label: 'Days',
      value: 'DAYS',
    }
  ];
  readonly serviceTypes: { label: string, value: string }[] = [
    {
      label: 'Reactive',
      value: 'REACTIVE',
    }, {
      label: 'Proactive',
      value: 'PROACTIVE',
    },
  ];
  readonly regions = regions;
  stream$!: Observable<ConfigurationViewModel>;

  @Input() segment?: AppSegment;

  constructor(
    private formGroup: FormBuilder,
    private recommendationDataService: RecommendationDataService,
    private segmentDefinitionDataService: SegmentDefinitionDataService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.stream$ = this.storageService.getBusinessProfile().pipe(
      switchMap(profile => this.segmentSource$.pipe(
        switchMap(segment => this.segmentDefinitionDataService.getSegmentDefinitions().pipe(
          map(segmentDefinitions => ({
            segment,
            profile: profile!,
            ...this.getAttacks(segmentDefinitions, segment),
          })),
          map(viewModel => ({ ...viewModel, form: this.createForm(profile, segment, viewModel.attackTypeLabels), }))
        )))));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['segment'].currentValue) {
      this.segmentSource$.next(changes['segment'].currentValue);
    }
  }

  submit(stream: ConfigurationViewModel): void {
    const recommendationProfile: RecommendationProfile = {
      region: [stream.form.get('region')!.value],
      budget: stream.form.get('investment')!.value,
      budgetWeight: 1,
      serviceType: [stream.form.get('serviceType')!.value],
      attackType: [stream.form.get('attackType')!.value],
      deploymentTime: stream.form.get('deploymentTime')!.value,
      deploymentTimeWeight: 1,
      leasingPeriod: stream.form.get('leasingPeriod')!.value,
      leasingPeriodWeight: 1,
    }

    const attackType = stream.attackTypes?.find(attack => attack.label === stream.form.get('attackType')!.value)?.values;
    if (attackType) {
      forkJoin(attackType.map(type => this.recommendationDataService.recommend({
        ...recommendationProfile,
        attackType: [type]
      }))).pipe(
        first(),
        map(nestedRecommendations => nestedRecommendations.reduce((pre, curr) => [...pre, ...curr], [])),
        // Remove duplications
        map((recommendations: any[]) =>
          recommendations.reduce((pre, curr) => [...pre, ...[pre.find((p: any) => p && p.id === curr.id) ? undefined : curr]], [])
            .filter((value: any) => !!value)
        ),
        switchMap(recommendations => this.storageService.updateSegment({
          ...this.segment!,
          recommendations: recommendations.map((recommendation: any) => ({ data: recommendation })),
          recommendationProfile: recommendationProfile
        }
          , false
        ))
      ).subscribe()
    } else {
      throw new Error('Could not find matching attack type');
    }
  }

  private createForm(profile: BusinessProfile | undefined, segment: AppSegment, attacks: string[] | undefined): FormGroup {
    return this.formGroup.group({
      region: [profile?.region, [Validators.required]],
      serviceType: [segment.recommendationProfile?.serviceType?.[0], [Validators.required]],
      attackType: [segment.recommendationProfile?.attackType?.[0] || attacks?.[0], [Validators.required]],
      deploymentTime: [segment.recommendationProfile?.deploymentTime, [Validators.required]],
      leasingPeriod: [segment.recommendationProfile?.leasingPeriod, [Validators.required]],
      investment: [segment.recommendationProfile?.budget || segment.optimalInvestment, [Validators.required]],
    });
  }

  private getAttacks(segmentDefinitions: SegmentDefinition[], segment: Segment) {
    let attackTypes = segmentDefinitions.find(definition => definition.key === segment.type)?.supportedThreats;
    if (attackTypes) {
      attackTypes = attackTypes.length > 1 ? [{ label: 'All', values: attackTypes.reduce((pre, curr) => [...pre, ...curr.values], [] as string[]) }, ...attackTypes] : attackTypes;
      return {
        attackTypeLabels: attackTypes?.map(t => t.label),
        attackTypes
      }
    } else {
      throw new Error('Find attack types failed');
    }
  }
}
