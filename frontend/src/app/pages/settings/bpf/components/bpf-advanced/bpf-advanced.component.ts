import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { validateParenthesis } from '../../functions/check-checkParenthesis.function';

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
  ],
})
export class BpfAdvancedComponent implements OnInit, ControlValueAccessor {
  private bpfSource$ = new BehaviorSubject<string | undefined>(undefined);
  private onChange?: (value: string) => void;

  error?: string;
  form$!: Observable<FormGroup>;
  onTouched?: () => void;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form$ = this.getForm();
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

  private getForm(): Observable<FormGroup> {
    return this.bpfSource$.pipe(
      filter((value) => !!value),
      map((value) => this.formBuilder.group({ bpf: [value] })),
      switchMap((form) =>
        merge(of(form), this.handleFormChanges(form).pipe(map(() => form))),
      ),
    );
  }

  private handleFormChanges(form: FormGroup): Observable<string> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return form.get('bpf')!.valueChanges.pipe(
      tap((value) => {
        if (validateParenthesis(value)) {
          if (this.onChange) {
            this.onChange(value);
          }
          this.error = '';
        } else {
          this.error = 'Parenthesis no balanced!';
        }
      }),
    );
  }
}
