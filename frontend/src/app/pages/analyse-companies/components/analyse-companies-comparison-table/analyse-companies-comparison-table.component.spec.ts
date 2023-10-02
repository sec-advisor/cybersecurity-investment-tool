/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnalyseCompaniesComparisonTableComponent } from './analyse-companies-comparison-table.component';

describe('AnalyseCompaniesComparisonTableComponent', () => {
  let component: AnalyseCompaniesComparisonTableComponent;
  let fixture: ComponentFixture<AnalyseCompaniesComparisonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseCompaniesComparisonTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseCompaniesComparisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
