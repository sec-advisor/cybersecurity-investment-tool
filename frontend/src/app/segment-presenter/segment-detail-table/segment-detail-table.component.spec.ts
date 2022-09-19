/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentDetailTableComponent } from './segment-detail-table.component';

describe('SegmentDetailTableComponent', () => {
  let component: SegmentDetailTableComponent;
  let fixture: ComponentFixture<SegmentDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentDetailTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
