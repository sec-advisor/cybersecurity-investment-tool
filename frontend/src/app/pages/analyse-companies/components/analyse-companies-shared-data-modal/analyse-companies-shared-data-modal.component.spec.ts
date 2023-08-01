/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnalyseCompaniesSharedDataModalComponent } from './analyse-companies-shared-data-modal.component';

describe('AnalyseCompaniesSharedDataModalComponent', () => {
  let component: AnalyseCompaniesSharedDataModalComponent;
  let fixture: ComponentFixture<AnalyseCompaniesSharedDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseCompaniesSharedDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseCompaniesSharedDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
