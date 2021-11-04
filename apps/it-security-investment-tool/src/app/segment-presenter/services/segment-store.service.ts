import { Injectable } from '@angular/core';

import { Segment } from '../../models/segment';

@Injectable({
  providedIn: 'root'
})
export class SegmentStoreService {

  private segments: Segment[] = [];

  getSegments(): Segment[] {
    return this.segments;
  }

  storeSegment(segment: Segment): void {
    this.segments.push(segment);
  }

  deleteSegment(segment: Segment): void {
    this.segments = this.segments.filter(s => s !== segment);
  }

}
