/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosiModalComponent } from './rosi-modal.component';

describe('RosiModalComponent', () => {
  let component: RosiModalComponent;
  let fixture: ComponentFixture<RosiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RosiModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
