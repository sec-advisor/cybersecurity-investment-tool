import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

import { TestSegment } from '../../models/test-segment.interface';

@Component({
  selector: 'app-test-segments',
  templateUrl: './test-segments.component.html',
  styleUrls: ['./test-segments.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TestSegmentsComponent),
    multi: true
  }]
})
export class TestSegmentsComponent implements OnInit, ControlValueAccessor {

  private valueSubject$ = new BehaviorSubject<TestSegment[] | undefined>(undefined);
  private onChange?: () => TestSegment[];

  viewModel$!: Observable<{ segments: TestSegment[] }>;
  segments?: TestSegment[]
  onTouched?: () => void;

  ngOnInit() {
    this.viewModel$ = this.valueSubject$.pipe(
      filter(segments => !!segments),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map(segments => ({ segments: segments! })));
  }

  writeValue(segments: TestSegment[]): void {
    this.valueSubject$.next(segments);
  }

  registerOnChange(fn: () => TestSegment[]): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
