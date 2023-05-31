import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AnalyseCompaniesViewService } from './services/analyse-companies-view.service';

@Component({
  selector: 'app-analyse-companies',
  templateUrl: './analyse-companies.component.html',
  styleUrls: ['./analyse-companies.component.scss']
})
export class AnalyseCompaniesComponent implements OnInit {

  viewModel$!: Observable<any>;

  constructor(private analyseCompaniesViewService: AnalyseCompaniesViewService) { }

  ngOnInit() {
    this.viewModel$ = this.analyseCompaniesViewService.getViewModel().pipe(tap(console.log))
  }

}
