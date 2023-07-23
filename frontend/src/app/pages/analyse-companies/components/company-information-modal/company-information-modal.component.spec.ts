/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyInformationModalComponent } from './company-information-modal.component';

describe('CompanyInformationModalComponent', () => {
  let component: CompanyInformationModalComponent;
  let fixture: ComponentFixture<CompanyInformationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInformationModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
