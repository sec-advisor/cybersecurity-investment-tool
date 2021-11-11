/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActionBoardComponent } from './action-board.component';

describe('ActionBoardComponent', () => {
  let component: ActionBoardComponent;
  let fixture: ComponentFixture<ActionBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
