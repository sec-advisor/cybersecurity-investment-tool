import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import { BpfBasicFormName } from '../models/bpf-basic-form-name.enum';
import {
  BpfBasicVariable,
  BpfBasicViewModel,
} from '../models/bpf-basic-view.model';

@Injectable({
  providedIn: 'root',
})
export class BpfBasicViewService {
  private readonly updateValueSubject$ = new BehaviorSubject<
    string | undefined
  >(undefined);
  private readonly valueSubject$ = new Subject<string>();

  constructor(private formBuilder: FormBuilder) {}

  getViewModel(): Observable<BpfBasicViewModel> {
    return this.updateValueSubject$.pipe(
      filter((value) => !!value),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((value) => ({ value: value!, variables: this.getVariables(value!) })),
      map(({ value, variables }) => ({
        value,
        variables,
        form: this.createForm(variables),
      })),
      switchMap(({ value, variables, form }) =>
        merge(
          of({ variables, form }),
          form.valueChanges.pipe(
            tap((formValue) => this.handleValueChanges(formValue, value)),
            map(() => ({ variables, form })),
          ),
        ).pipe(map((viewModel) => ({ viewModel }))),
      ),
    );
  }

  getValue(): Observable<string> {
    return this.valueSubject$;
  }

  updateValue(value: string): void {
    this.updateValueSubject$.next(value);
  }

  private createForm(variables: BpfBasicVariable[]): FormGroup {
    return this.formBuilder.group(
      variables.reduce(
        (pre, variable) => ({
          ...pre,
          [variable.controlName]: [variable.value, [Validators.required]],
        }),
        {},
      ),
    );
  }

  private handleValueChanges(
    formValue: [formName: number],
    value: string,
  ): void {
    const splittedValue = this.getSplittedValue(value);
    const updatedValue = Object.entries(formValue).map(([key, value]) => ({
      key: key as BpfBasicFormName,
      value,
    }));
    const newBpfValue = splittedValue
      .map((s) => this.replaceValueParts(s, updatedValue))
      .reduce((pre, curr) => `${pre}${curr}`, '');

    this.valueSubject$.next(newBpfValue);
  }

  private replaceValueParts(
    valuePart: string,
    formValue: { key: BpfBasicFormName; value: number }[],
  ): string {
    return formValue.reduce((pre, value) => {
      const newValue = value.value ?? 1;
      if (valuePart.includes(value.key) && newValue !== 1) {
        return `${newValue}${value.key}`;
      }
      return pre;
    }, valuePart);
  }

  private getVariables(value: string): BpfBasicVariable[] {
    const variables = [
      {
        name: 'v',
        description: 'Vulnerability',
        controlName: BpfBasicFormName.V,
      },
      {
        name: 'z',
        description: 'Investment',
        controlName: BpfBasicFormName.Z,
      },
      {
        name: 'L',
        description: 'Potential Loss',
        controlName: BpfBasicFormName.L,
      },
    ];

    if (variables.every((v) => value.includes(v.name))) {
      const splittedValue = this.getSplittedValue(value);

      return variables.map((v) => ({
        ...v,
        value: this.getVariableValue(v.name, splittedValue),
      }));
    }
    throw new Error('Required parameters are missing!');
  }

  private getSplittedValue(value: string): string[] {
    const splitters = ['+', '-', '/', '*', '(', ')'];
    splitters.forEach(
      (splitter) => (value = value.replaceAll(splitter, '~' + splitter + '~')),
    );
    return value.split('~').filter((part) => !!part);
  }

  private getVariableValue(name: string, splittedValue: string[]): number {
    const value = splittedValue
      .find((s) => s.includes(name))
      ?.replace(name, '');
    return value ? +value : 1;
  }
}
