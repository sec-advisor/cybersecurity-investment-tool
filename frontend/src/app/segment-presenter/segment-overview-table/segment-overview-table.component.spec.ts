/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SegmentOverviewTableComponent } from './segment-overview-table.component';

describe('SegmentOverviewTableComponent', () => {
  let component: SegmentOverviewTableComponent;
  let fixture: ComponentFixture<SegmentOverviewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentOverviewTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
