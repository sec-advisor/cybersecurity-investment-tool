import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, from, of, Subscriber, switchMap } from 'rxjs';

import { Segment } from '../../../../../libs/api-interfaces';
import { DangerModalComponent } from '../../../layouts/danger-modal/danger-modal.component';
import { StorageService } from '../../../services/storage.service';
import { SegmentRegistratorComponent } from '../segment-registrator/segment-registrator.component';

@Component({
  selector: 'app-segment-detail-table',
  templateUrl: './segment-detail-table.component.html',
  styleUrls: ['./segment-detail-table.component.scss'],
})
export class SegmentDetailTableComponent {
  private readonly subscriber = new Subscriber();

  @ViewChild(SegmentRegistratorComponent)
  segmentModal?: SegmentRegistratorComponent;

  @Input() segments?: Segment[];

  constructor(
    private modalService: NgbModal,
    private storageService: StorageService,
  ) {}

  editSegment(segment: Segment): void {
    this.segmentModal?.openSegmentDialog(segment);
  }

  removeSegment(segment: Segment): void {
    if (segment.id) {
      this.subscriber.add(
        from(this.modalService.open(DangerModalComponent).result)
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            switchMap(() => this.storageService.removeSegment(segment.id!)),
            catchError(() => of(undefined)),
          )
          .subscribe(),
      );
    }
  }
}
