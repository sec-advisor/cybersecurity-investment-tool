import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Segment } from '@libs';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-test-segments',
  templateUrl: './test-segments.component.html',
  styleUrls: ['./test-segments.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSegmentsComponent),
      multi: true,
    },
  ],
})
export class TestSegmentsComponent implements OnInit, ControlValueAccessor {
  private valueSubject$ = new BehaviorSubject<Segment[] | undefined>(undefined);
  private onChange?: () => Segment[];

  viewModel$!: Observable<{ segments: Segment[] }>;
  segments?: Segment[];
  onTouched?: () => void;

  ngOnInit() {
    this.viewModel$ = this.valueSubject$.pipe(
      filter((segments) => !!segments),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((segments) => ({ segments: segments! })),
    );
  }

  writeValue(segments: Segment[]): void {
    this.valueSubject$.next(segments);
  }

  registerOnChange(fn: () => Segment[]): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
