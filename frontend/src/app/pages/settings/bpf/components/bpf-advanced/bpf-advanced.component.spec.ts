import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { BpfAdvancedComponent } from './bpf-advanced.component';

describe('BpfAdvancedComponent', () => {
  let component: BpfAdvancedComponent;
  let fixture: ComponentFixture<BpfAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [BpfAdvancedComponent],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpfAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
