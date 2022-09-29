import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TestSegment } from './models/test-segment.interface';

@Component({
  selector: 'app-bpf',
  templateUrl: './bpf.component.html',
  styleUrls: ['./bpf.component.scss'],
})
export class BpfComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      bpf: ['v/(1+(z/(L*0.001)))'],
      segments: [this.getSegments()],
    });
  }

  private getSegments(): TestSegment[] {
    return [
      { name: 'Customers Db', value: 120000000, risk: 80, vulnerability: 50 },
      {
        name: 'Internal Operations Db',
        value: 60000000,
        risk: 50,
        vulnerability: 50,
      },
      {
        name: 'External Operations Db',
        value: 20000000,
        risk: 20,
        vulnerability: 50,
      },
    ];
  }
}
