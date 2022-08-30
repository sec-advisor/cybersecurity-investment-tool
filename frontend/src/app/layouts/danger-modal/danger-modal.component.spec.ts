/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerModalComponent } from './danger-modal.component';

describe('DangerModalComponent', () => {
  let component: DangerModalComponent;
  let fixture: ComponentFixture<DangerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DangerModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
