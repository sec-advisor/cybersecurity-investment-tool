import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { RecommendationViewModel, SegmentViewModel } from './models/recommendation-view.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  stream$!: Observable<RecommendationViewModel>;

  readonly segments = [
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
    { name: '1', text: 'hallo' },
  ]

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.stream$ = this.storageService.getSegments().pipe(
      map(segments => ({ segments: segments.map(segment => ({ ...segment, isActive: false })) }))
    );
  }

  segmentClick(segments: SegmentViewModel[], selectedSegment: SegmentViewModel): void {
    segments.forEach(segment => segment.isActive = false);
    selectedSegment.isActive = true;
  }

}
