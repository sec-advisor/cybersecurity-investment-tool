import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of, Subscriber } from 'rxjs';

import { StorageService } from '../../services/storage.service';
import { SegmentRegistratorComponent } from '../segment-registrator/segment-registrator.component';
import { SegmentPresenterActionService } from '../services/segment-presenter-action.service';

@Component({
  selector: 'app-action-board',
  templateUrl: './action-board.component.html',
  styleUrls: ['./action-board.component.scss'],
})
export class ActionBoardComponent implements OnInit, OnDestroy {
  private subscriber = new Subscriber();

  readonly buttons = [
    {
      text: of('Add new segment'),
      icon: of('bi-plus-circle-fill'),
      action: () => this.showDialog(),
    },
    {
      text: this.getViewText(),
      icon: this.getViewIcon(),
      action: () => this.toggleView(),
      disabled: true,
    },
  ];
  @ViewChild(SegmentRegistratorComponent)
  segmentModal?: SegmentRegistratorComponent;

  constructor(
    private storageService: StorageService,
    public segmentPresenterActionService: SegmentPresenterActionService,
  ) {}

  ngOnInit(): void {
    this.subscriber.add(
      this.storageService.getSegments().subscribe((segments) => {
        if (segments.length > 0) {
          this.buttons.forEach((button) => (button.disabled = false));
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.segmentPresenterActionService.startLoading();
  }

  execute(button: {
    text: Observable<string>;
    icon: Observable<string>;
    action: () => any;
  }): void {
    button.action();
  }

  showDialog(): void {
    this.segmentModal?.openSegmentDialog();
  }

  toggleView(): void {
    this.segmentPresenterActionService.toggleView();
  }

  private getViewText(): Observable<string> {
    return this.segmentPresenterActionService
      .getView()
      .pipe(
        map((view) =>
          view === 'overview' ? 'Show segment details' : 'Show overview table',
        ),
      );
  }

  private getViewIcon(): Observable<string> {
    return this.segmentPresenterActionService
      .getView()
      .pipe(
        map((view) =>
          view === 'overview'
            ? 'bi-eye-fill'
            : 'bi-file-earmark-bar-graph-fill',
        ),
      );
  }
}
