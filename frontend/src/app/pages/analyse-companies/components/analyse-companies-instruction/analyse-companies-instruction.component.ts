import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { AnalyseCompaniesModalService } from '../../services/analyse-companies-modal.service';

@Component({
  selector: 'app-analyse-companies-instruction',
  templateUrl: './analyse-companies-instruction.component.html',
  styleUrls: ['./analyse-companies-instruction.component.scss'],
})
export class AnalyseCompaniesInstructionComponent implements OnInit {
  constructor(
    private analyseCompaniesModalService: AnalyseCompaniesModalService,
  ) {}

  ngOnInit() {}

  showModal(): void {
    this.analyseCompaniesModalService.showModal().pipe(first()).subscribe();
  }
}
