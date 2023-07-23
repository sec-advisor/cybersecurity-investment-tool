import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseCompaniesComparisonChartsComponent } from './analyse-companies-comparsion-charts.component';

/* tslint:disable:no-unused-variable */
describe('AnalyseCompaniesComparsionChartsComponent', () => {
  let component: AnalyseCompaniesComparisonChartsComponent;
  let fixture: ComponentFixture<AnalyseCompaniesComparisonChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseCompaniesComparisonChartsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AnalyseCompaniesComparisonChartsComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
