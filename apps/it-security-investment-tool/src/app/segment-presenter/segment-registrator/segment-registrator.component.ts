import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SegmentDefinition } from '@app/api-interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SegmentDataService } from '../../services/segment-data.service';
import { SegmentRegistrationStream as SegmentRegistrationViewModel } from '../models/segment-registration-view.model';
import { SegmentStoreService } from '../services/segment-store.service';

@Component({
  selector: 'app-segment-registrator',
  templateUrl: './segment-registrator.component.html',
  styleUrls: ['./segment-registrator.component.scss']
})
export class SegmentRegistratorComponent implements OnInit {

  selectedSegment?: SegmentDefinition;
  stream$?: Observable<SegmentRegistrationViewModel>;
  supportValueEstimation = true;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private segmentStoreService: SegmentStoreService,
    private segmentDataService: SegmentDataService,
  ) { }

  ngOnInit(): void {
    this.stream$ = this.segmentDataService.getSegmentDefinitions().pipe(
      map(segments => ({
        form: this.formBuilder.group({
          name: 'Test',
          type: undefined,
          value: 5000,
          vulnerability: 0,
        }),
        typeOptions: this.getSegmentTypes(segments),
        segments
      })
      ),
      switchMap(stream => merge(of(stream), this.handleFormChanges(stream))),
      // tap(console.log)
    )
  }

  isSegmentTypeSelected(form: FormGroup): boolean {
    return !!form.get('type')?.value
  }

  openSegmentDialog(dialog: TemplateRef<any>): void {
    this.modalService.open(dialog, { ariaLabelledBy: 'segment-registrator', size: 'lg' }).result.then((form: FormGroup) => {
      this.segmentStoreService.storeSegment({
        name: form.controls.name.value,
        value: form.controls.value.value,
        vulnerability: form.controls.vulnerability.value
      });
    }, (reason) => {
      // console.log(reason)
    });
  }

  calculateValue(stream: SegmentRegistrationViewModel): void {
    this.segmentDataService.estimateValue(
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
