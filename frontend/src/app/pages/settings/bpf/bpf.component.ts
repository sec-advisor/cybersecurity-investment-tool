import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Segment } from '@libs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  filter,
  first,
  from,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import { DangerModalComponent } from '../../../layouts/danger-modal/danger-modal.component';
import { ToastNotificationService } from '../../../layouts/toast-notification/services/toast-notification.service';
import { EquationDataService } from '../../../services/backend/equation-data.service';
import { SegmentDataService } from '../../../services/backend/segment-data.service';
import { SettingsDataService } from '../../../services/backend/settings-data.service';
import { StorageService } from '../../../services/storage.service';
import { BpfFormName } from '../models/bpf-form-name.enum';
import { testSegments } from './constants/test-segment.constant';
import { BpfViewModel } from './models/bpf-view.model';
import { BpfViewService } from './services/bpf-view.service';

@Component({
  selector: 'app-bpf',
  templateUrl: './bpf.component.html',
  styleUrls: ['./bpf.component.scss'],
})
export class BpfComponent implements OnInit {
  private readonly reloadSubject$ = new Subject<void>();
  private readonly isEditMode$ = new BehaviorSubject(false);

  errorText = '';
  viewModel$!: Observable<BpfViewModel>;
  userBpf?: string;

  constructor(
    private bpfViewService: BpfViewService,
    private equationDataService: EquationDataService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private settingsDataService: SettingsDataService,
    private segmentDataService: SegmentDataService,
    private storageService: StorageService,
    private toastNotificationService: ToastNotificationService,
  ) {}

  ngOnInit() {
    this.viewModel$ = this.getViewModel(testSegments).pipe();
  }

  changeEditMode(form: FormGroup): void {
    this.isEditMode$.next(!this.isEditMode$.value);

    if (!this.isEditMode$.value) {
      form.get(BpfFormName.Bpf)?.setValue(this.userBpf);
      form.markAsPristine();
      this.errorText = '';
    }
  }

  save(form: FormGroup): void {
    const bpf = form.get(BpfFormName.Bpf)?.value;
    if (bpf) {
      this.settingsDataService
        .save({ bpf })
        .pipe(
          catchError(() => {
            this.toastNotificationService.showDanger('Save settings failed!');
            return EMPTY;
          }),
          tap(() => {
            this.toastNotificationService.showSuccess(
              'Successfully stored settings!',
            );
            form.markAsPristine();
            this.userBpf = bpf;
            this.isEditMode$.next(false);
          }),
          switchMap(() => this.bpfViewService.resetSegments().pipe(first())),
        )
        .subscribe();
    }
  }

  reset(): void {
    from(this.modalService.open(DangerModalComponent).result)
      .pipe(
        switchMap(() =>
          this.settingsDataService.reset().pipe(
            catchError(() => {
              this.toastNotificationService.showDanger(
                'Settings reset failed!',
              );
              return EMPTY;
            }),
            tap(() => {
              this.toastNotificationService.showSuccess(
                'Successfully reset settings!',
              );
              this.reloadSubject$.next();
            }),
            switchMap(() => this.bpfViewService.resetSegments().pipe(first())),
          ),
        ),
        catchError(() => EMPTY),
      )
      .subscribe();
  }

  private getViewModel(segments: Segment[]): Observable<BpfViewModel> {
    return combineLatest([
      this.equationDataService.getOriginBbf(),
      this.reloadSubject$.pipe(
        startWith(undefined),
        switchMap(() =>
          this.equationDataService.getBpf().pipe(
            tap((bpf) => (this.userBpf = bpf)),
            switchMap((bpf) =>
              this.segmentDataService
                .calculateTestOptimalInvestment(segments, bpf)
                .pipe(
                  map((segments) =>
                    this.formBuilder.group({
                      [BpfFormName.Bpf]: [bpf],
                      [BpfFormName.Segments]: [segments],
                    }),
                  ),
                  switchMap((form) =>
                    merge(
                      of(form),
                      this.handleFormChanges(form).pipe(map(() => form)),
                      this.isEditMode$.pipe(
                        tap((isEditMode) =>
                          isEditMode
                            ? form.enable({ emitEvent: false })
                            : form.disable({ emitEvent: false }),
                        ),
                        map(() => form),
                      ),
                    ),
                  ),
                ),
            ),
          ),
        ),
      ),
    ]).pipe(map(([originBpf, form]) => ({ originBpf, form })));
  }

  private handleFormChanges(form: FormGroup): Observable<Segment[]> {
    return form.valueChanges.pipe(
      tap(() => form.updateValueAndValidity({ emitEvent: false })),
      filter(() => form.valid),
      map((formValue) => ({
        bpf: formValue.bpf,
        segments: formValue.segments,
      })),
      switchMap((formValue) =>
        this.segmentDataService
          .calculateTestOptimalInvestment(formValue.segments, formValue.bpf)
          .pipe(
            catchError(() => {
              this.errorText =
                'Optimal investment can not be calculated. Check your BPF!';
              return EMPTY;
            }),
          ),
      ),
      tap((segments) =>
        form
          .get(BpfFormName.Segments)
          ?.setValue(segments, { emitValue: false, onlySelf: true }),
      ),
      tap(() => (this.errorText = '')),
    );
  }
}
