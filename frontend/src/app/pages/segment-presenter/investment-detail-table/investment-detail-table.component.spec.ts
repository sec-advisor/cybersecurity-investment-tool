/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvestmentDetailTableComponent } from './investment-detail-table.component';

describe('InvestmentDetailTableComponent', () => {
  let component: InvestmentDetailTableComponent;
  let fixture: ComponentFixture<InvestmentDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentDetailTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
