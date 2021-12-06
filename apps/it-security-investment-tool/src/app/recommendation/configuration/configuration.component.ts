import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessProfile, Segment, SegmentDefinition } from '@app/api-interfaces';
import { first, forkJoin, map, Observable, Subject, switchMap, tap } from 'rxjs';

import { regions } from '../../constants/regions.constant';
import { RecommendationDataService } from '../../services/backend/recommendation-data.service';
import { SegmentDefinitionDataService } from '../../services/backend/segment-definition-data.service';
import { StorageService } from '../../services/storage.service';
import { ConfigurationViewModel } from '../models/configuration-view.model';
import { RecommendationService } from '../services/recommendation.service';

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

  @Input() segment?: Segment;

  constructor(
    private formGroup: FormBuilder,
    private recommendationService: RecommendationService,
    private recommendationDataService: RecommendationDataService,
    private segmentDefinitionDataService: SegmentDefinitionDataService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.stream$ = this.storageService.getBusinessProfile().pipe(
      switchMap(profile => this.segmentSource$.pipe(
        switchMap(segment => this.segmentDefinitionDataService.getSegmentDefinitions().pipe(
          map(segmentDefinitions => ({
            segment, profile: profile!,
            ...this.getAttacks(segmentDefinitions, segment),
          })),
          map(viewModel => ({ ...viewModel, form: this.createForm(profile, segment, viewModel.attackTypeLabels), }))
        )))));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.segment.currentValue) {
      this.segmentSource$.next(changes.segment.currentValue);
    }
  }

  submit(stream: ConfigurationViewModel): void {
    const attackType = stream.attackTypes?.find(attack => attack.label === stream.form.get('attackType')!.value)?.values;

    if (attackType) {
      forkJoin(attackType.map(type => this.recommendationDataService.recommend({
        region: [stream.form.get('region')!.value],
        budget: stream.form.get('investment')!.value,
        budgetWeight: 1,
        serviceType: [stream.form.get('serviceType')!.value],
        attackType: [type],
        deploymentTime: stream.form.get('deploymentTime')!.value,
        deploymentTimeWeight: 1,
        leasingPeriod: stream.form.get('leasingPeriod')!.value,
        leasingPeriodWeight: 1,
      }))).pipe(
        first(),
        map(nestedRecommendations => nestedRecommendations.reduce((pre, curr) => [...pre, ...curr], [])),
        tap(console.log),
        // Remove duplications
        map((recommendations: any[]) =>
          recommendations.reduce((pre, curr) => [...pre, ...[pre.find((p: any) => p && p.id === curr.id) ? undefined : curr]], [])
            .filter((value: any) => !!value)
        ),
        tap(recommendations => this.recommendationService.setRecommendations(recommendations))
      ).subscribe()
    } else {
      throw new Error('Could not find matching attack type');
    }
  }

  private createForm(profile: BusinessProfile | undefined, segment: Segment, attacks: string[] | undefined): FormGroup {
    return this.formGroup.group({
      region: [profile?.region, [Validators.required]],
      serviceType: [undefined, [Validators.required]],
      attackType: [attacks?.[0], [Validators.required]],
      deploymentTime: [undefined, [Validators.required]],
      leasingPeriod: [undefined, [Validators.required]],
      investment: [segment.optimalInvestment, [Validators.required]],
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
