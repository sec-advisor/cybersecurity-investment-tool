/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentRegistratorComponent } from './segment-registrator.component';

describe('SegmentRegistratorComponent', () => {
  let component: SegmentRegistratorComponent;
  let fixture: ComponentFixture<SegmentRegistratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentRegistratorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentRegistratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
