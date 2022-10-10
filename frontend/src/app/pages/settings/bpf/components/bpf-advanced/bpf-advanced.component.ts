import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { EquationDataService } from '../../../../../services/backend/equation-data.service';
import { BpfAdvancedViewModel } from './models/bpf-advanced-view.model';

@Component({
  selector: 'app-bpf-advanced',
  templateUrl: './bpf-advanced.component.html',
  styleUrls: ['./bpf-advanced.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BpfAdvancedComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BpfAdvancedComponent,
      multi: true,
    },
  ],
})
export class BpfAdvancedComponent implements OnInit, ControlValueAccessor {
  private readonly isFormDisabled$ = new BehaviorSubject(false);
  private isError = true;
  private bpfSource$ = new BehaviorSubject<string | undefined>(undefined);
  private onChange?: (value: string) => void;

  viewModel$!: Observable<BpfAdvancedViewModel>;
  onTouched?: () => void;

  @Input() errorText = '';

  constructor(
    private equationDataService: EquationDataService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.viewModel$ = this.getViewModel();
  }

  writeValue(value: string): void {
    this.bpfSource$.next(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(): { invalid: boolean } | undefined {
    return this.isError ? { invalid: true } : undefined;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isFormDisabled$.next(isDisabled);
  }

  private getViewModel(): Observable<BpfAdvancedViewModel> {
    return this.bpfSource$.pipe(
      filter((value) => !!value),
      map((value) => ({
        form: this.formBuilder.group({ bpf: [value] }),
      })),

      switchMap((viewModel) =>
        merge(
          of(viewModel),
          this.handleFormChanges(viewModel.form).pipe(
            map((error) => ({ ...viewModel, error })),
          ),
          this.isFormDisabled$.pipe(
            tap((isDisabled) =>
              isDisabled
                ? viewModel.form.disable({ emitEvent: false })
                : viewModel.form.enable({ emitEvent: false }),
            ),
            map(() => viewModel),
          ),
        ),
      ),
    );
  }

  private handleFormChanges(form: FormGroup): Observable<string | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return form.get('bpf')!.valueChanges.pipe(
      debounceTime(400),
      switchMap((value) =>
        this.equationDataService.validateBpf(value).pipe(
          map((validationResponse) => validationResponse.error),
          tap((error) => {
            this.isError = !!error;

            if (this.onChange) {
              this.onChange(value);
            }
          }),
        ),
      ),
    );
  }
}
