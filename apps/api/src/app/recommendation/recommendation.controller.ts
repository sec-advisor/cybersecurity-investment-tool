import { RecommendationProfile, ROSIDetail } from '@app/api-interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RecommendationService } from './services/recommendation.service';

@Controller('recommendation')
export class RecommendationController {

  constructor(private recommendationService: RecommendationService) { }

  @Post('/recommend')
  recommend(@Body() recommendationProfile: RecommendationProfile): Observable<any> {
    return this.recommendationService.recommend(recommendationProfile);
  }

  @Post('/calculate-rosi')
  calculateROSI(@Body() rosiDetail: ROSIDetail): Observable<ROSIDetail> {
    return this.recommendationService.calculateROSI(rosiDetail);
  }
}
