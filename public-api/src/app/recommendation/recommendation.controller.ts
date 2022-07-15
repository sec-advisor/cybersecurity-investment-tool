import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RecommendationProfile, ROSIDetail } from '../../../libs/api-interfaces';
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
