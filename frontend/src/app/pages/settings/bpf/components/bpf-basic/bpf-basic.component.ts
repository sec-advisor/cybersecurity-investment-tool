import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  merge,
  Observable,
  of,
  Subscriber,
  tap,
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BpfBasicViewModel } from './models/bpf-basic-view.model';
import { BpfBasicViewService } from './services/bpf-basic-view.service';

@Component({
  selector: 'app-bpf-basic',
  templateUrl: './bpf-basic.component.html',
  styleUrls: ['./bpf-basic.component.scss'],
  providers: [
    BpfBasicViewService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BpfBasicComponent),
      multi: true,
    },
  ],
})
export class BpfBasicComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private readonly isFormDisabled$ = new BehaviorSubject(false);
  private readonly subscriber = new Subscriber();
  private onChange?: (value: string) => void;

  viewModel$!: Observable<BpfBasicViewModel>;
  onTouched?: () => void;

  constructor(private bpfBasicViewService: BpfBasicViewService) {}

  ngOnInit() {
    this.viewModel$ = this.getViewModel();
    this.subscriber.add(this.updateValue().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  writeValue(value: string): void {
    this.bpfBasicViewService.updateValue(value);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isFormDisabled$.next(isDisabled);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private getViewModel(): Observable<BpfBasicViewModel> {
    return this.bpfBasicViewService.getViewModel().pipe(
      switchMap((viewModel) =>
        merge(
          of(viewModel),
          this.isFormDisabled$.pipe(
            tap((isDisabled) =>
              isDisabled
                ? viewModel.viewModel?.form.disable({ emitEvent: false })
                : viewModel.viewModel?.form.enable({ emitEvent: false }),
            ),
            map(() => viewModel),
          ),
        ),
      ),
      catchError((error) => of({ error: error })),
    );
  }

  private updateValue(): Observable<string> {
    return this.bpfBasicViewService.getValue().pipe(
      tap((newValue) => {
        if (this.onChange) {
          this.onChange(newValue);
        }
      }),
    );
  }
}
