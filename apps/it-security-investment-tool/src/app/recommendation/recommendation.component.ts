import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { RecommendationViewModel } from './models/recommendation-view.model';
import { RecommendationService } from './services/recommendation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  stream$!: Observable<RecommendationViewModel>;

  constructor(
    private recommendationService: RecommendationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.stream$ = this.storageService.getSegments().pipe(
      switchMap(segments => this.recommendationService.getSelectedSegment().pipe(
        map(selectedSegment => ({ segments, selectedSegment: segments.find(segment => segment.id === selectedSegment?.id) })))),
      map(({ segments, selectedSegment }) => ({
        segments: segments.map(segment => ({ ...segment, isActive: segment.id === selectedSegment?.id })),
        selectedSegment
      }))
    );
  }

}
