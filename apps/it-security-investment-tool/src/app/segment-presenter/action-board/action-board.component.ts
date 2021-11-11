import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, first, Subscriber, switchMap, tap } from 'rxjs';

import { SegmentDataService } from '../../services/backend/segment-data.service';
import { StorageService } from '../../services/storage.service';
import { SegmentRegistratorComponent } from '../segment-registrator/segment-registrator.component';

@Component({
  selector: 'app-action-board',
  templateUrl: './action-board.component.html',
  styleUrls: ['./action-board.component.scss']
})
export class ActionBoardComponent implements OnInit {

  private subscriber = new Subscriber();

  readonly buttons = [
    { text: 'Add new segment', icon: 'bi-plus-circle-fill', action: () => this.showDialog() },
    { text: 'Calculate optimal investment', icon: 'bi-calculator-fill', action: () => this.calculateOptimalInvestment(), disabled: true },
  ]
  readonly isLoading$ = new BehaviorSubject(false);

  @ViewChild(SegmentRegistratorComponent) segmentModal?: SegmentRegistratorComponent;

  constructor(private segmentDataService: SegmentDataService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.subscriber.add(this.storageService.getSegments().subscribe(segments => {
      if (segments.length > 0) {
        this.buttons.forEach(button => button.disabled = false);
      }
    }))
  }

  execute(button: { text: string, icon: string, action: () => any }): void {
    button.action();
  }

  showDialog(): void {
    this.segmentModal?.openSegmentDialog();
  }

  calculateOptimalInvestment(): void {
    this.isLoading$.next(true);
    this.subscriber.add(this.storageService.getSegments().pipe(
      first(),
      switchMap(segments => this.segmentDataService.calculateInvestment(segments)),
      tap(segments => this.storageService.updateSegments(segments)),
      tap(() => this.isLoading$.next(false))
    ).subscribe());
  }

}
