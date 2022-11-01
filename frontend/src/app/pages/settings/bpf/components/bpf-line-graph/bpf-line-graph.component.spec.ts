/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpfLineGraphComponent } from './bpf-line-graph.component';

describe('BpfLineGraphComponent', () => {
  let component: BpfLineGraphComponent;
  let fixture: ComponentFixture<BpfLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [BpfLineGraphComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpfLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
