import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Input, Segment, SegmentDefinition } from '@app/api-interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, merge, Observable, of, Subscriber } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SegmentDefinitionDataService } from '../../services/backend/segment-definition-data.service';
import { StorageService } from '../../services/storage.service';
import { SegmentRegistrationStream as SegmentRegistrationViewModel } from '../models/segment-registration-view.model';

@Component({
  selector: 'app-segment-registrator',
  templateUrl: './segment-registrator.component.html',
  styleUrls: ['./segment-registrator.component.scss']
})
export class SegmentRegistratorComponent implements OnInit, OnDestroy {

  private readonly subscriber = new Subscriber();

  isEditMode = false;
  selectedSegment?: SegmentDefinition;
  stream!: SegmentRegistrationViewModel;
  supportValueEstimation = true;

  @ViewChild('modal', { static: true }) modal?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private segmentDefinitionDataService: SegmentDefinitionDataService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.subscriber.add(this.segmentDefinitionDataService.getSegmentDefinitions().pipe(
      map(segments => ({
        form: this.formBuilder.group({
          name: 'Test',
          type: [undefined, [Validators.required]],
          value: [5000, [Validators.required]],
          risk: [undefined, [Validators.required]],
          vulnerability: [undefined, [Validators.required]],
        }),
        typeOptions: this.getSegmentTypes(segments),
        segments
      })
      ),
      switchMap(stream => merge(of(stream), this.handleFormChanges(stream))),
    ).subscribe(stream => this.stream = stream))
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  isSegmentTypeSelected(form: FormGroup): boolean {
    return !!form.get('type')?.value
  }

  openSegmentDialog(segment?: Segment): void {
    if (segment) {
      this.isEditMode = true
      this.stream.form.patchValue({
        name: segment.name,
        type: segment.type,
        value: segment.value,
        risk: segment.risk,
        vulnerability: segment.vulnerability
      });
    }

    this.subscriber.add(from(this.modalService.open(this.modal, { ariaLabelledBy: 'segment-registrator', }).result).pipe(
      switchMap((stream: SegmentRegistrationViewModel) => this.storageService.getBusinessProfile().pipe(map(profile => ({ companyId: profile?.id, stream })))),
      map(({ stream, companyId }) => ({
        companyId: companyId as string,
        name: stream.form.controls.name.value,
        type: stream.form.controls.type.value,
        value: stream.form.controls.value.value,
        risk: stream.form.controls.risk.value,
        vulnerability: stream.form.controls.vulnerability.value
      })),
      map(s => this.isEditMode ? ({ ...s, id: segment?.id, companyId: segment?.companyId }) : s),
      switchMap(segment => this.isEditMode ? this.storageService.updateSegment(segment) : this.storageService.storeSegment(segment)),
      catchError(() => of(undefined))
    ).subscribe());
  }

  calculateValue(stream: SegmentRegistrationViewModel): void {
    this.segmentDefinitionDataService.estimateValue(
      this.selectedSegment,
      this.selectedSegment?.valueEstimation.inputs.map(input => ({ key: input.key, value: +stream.form.get(input.key)?.value }))
    ).pipe(
      // TODO CH: Hanlde error properly
      catchError((err) => of(console.error(err.error.message))),
    ).subscribe(segmentValue => {
      stream.form.controls.value.setValue(segmentValue, { emitEvent: false });
    })
  }

  toggleEstimationValue(): void {
    this.supportValueEstimation = !this.supportValueEstimation;
  }

  doesNextElementExists(inputs: Input[], index: number): boolean {
    return !!inputs[index + 1];
  }

  private getSegmentTypes(segments: SegmentDefinition[]): { id: string, description: string }[] {
    return segments.map(segment => ({ id: segment.key, description: segment.description }));
  }

  private handleFormChanges(stream: SegmentRegistrationViewModel): Observable<SegmentRegistrationViewModel> {
    return of(stream).pipe(
      switchMap(stream => stream.form.controls.type.valueChanges.pipe(
        tap(type => this.addDynamicInputsControls(stream.form, stream.segments, type)))),
      map(() => stream),
    )
  }

  private addDynamicInputsControls(form: FormGroup, segments: SegmentDefinition[], type: string): void {
    const selectedSegment = segments.find(segment => segment.key === type);
    selectedSegment?.valueEstimation.inputs.forEach(input => form.addControl(input.key, new FormControl(0)))
    this.selectedSegment = selectedSegment;
  }

}
