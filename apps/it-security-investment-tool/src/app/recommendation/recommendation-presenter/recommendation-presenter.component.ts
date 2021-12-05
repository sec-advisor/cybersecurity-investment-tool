import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { RecommendationService } from '../services/recommendation.service';

@Component({
  selector: 'app-recommendation-presenter',
  templateUrl: './recommendation-presenter.component.html',
  styleUrls: ['./recommendation-presenter.component.scss']
})
export class RecommendationPresenterComponent implements OnInit {

  recommendations$!: Observable<any[]>;

  constructor(
    private recommendationService: RecommendationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.recommendations$ = this.recommendationService.getRecommendations();
  }

  getImage(image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
