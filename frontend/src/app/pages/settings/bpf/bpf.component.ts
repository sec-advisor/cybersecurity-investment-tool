import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Segment } from '@libs';
import {
  catchError,
  EMPTY,
  map,
  merge,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { SettingsDataService } from '../../../services/backend/settings-data.service';
import { BpfFormName } from '../models/bpf-form-name.enum';

@Component({
  selector: 'app-bpf',
  templateUrl: './bpf.component.html',
  styleUrls: ['./bpf.component.scss'],
})
export class BpfComponent implements OnInit {
  private readonly bpf = 'v/(1+(z/(L*0.001)))';

  errorText = '';

  form$!: Observable<FormGroup>;

  constructor(
    private formBuilder: FormBuilder,
    private settingsDataService: SettingsDataService,
  ) {}

  ngOnInit() {
    this.form$ = this.getForm(this.getSegments(), this.bpf);
  }

  private getForm(segments: Segment[], bpf: string): Observable<FormGroup> {
    return this.settingsDataService
      .calculateOptimalInvestment(segments, bpf)
      .pipe(
        map((segments) =>
          this.formBuilder.group({
            [BpfFormName.Bpf]: [bpf],
            [BpfFormName.Segments]: [segments],
          }),
        ),
        switchMap((form) =>
          merge(of(form), this.handleFormChanges(form).pipe(map(() => form))),
        ),
      );
  }

  private handleFormChanges(form: FormGroup): Observable<Segment[]> {
    return form.valueChanges.pipe(
      map((formValue) => ({
        bpf: formValue.bpf,
        segments: formValue.segments,
      })),
      switchMap((formValue) =>
        this.settingsDataService
          .calculateOptimalInvestment(formValue.segments, formValue.bpf)
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

  private getSegments(): Segment[] {
    return [
      {
        name: 'Customers Db',
        value: 120000000,
        risk: 80,
        vulnerability: 50,
        type: '',
        typeDescription: '',
      },
      {
        name: 'Internal Operations Db',
        value: 60000000,
        risk: 50,
        vulnerability: 40,
        type: '',
        typeDescription: '',
      },
      {
        name: 'External Operations Db',
        value: 20000000,
        risk: 20,
        vulnerability: 50,
        type: '',
        typeDescription: '',
      },
    ];
  }
}
