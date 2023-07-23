/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnalyseCompaniesInstructionComponent } from './analyse-companies-instruction.component';

describe('AnalyseCompaniesInstructionComponent', () => {
  let component: AnalyseCompaniesInstructionComponent;
  let fixture: ComponentFixture<AnalyseCompaniesInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseCompaniesInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseCompaniesInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
