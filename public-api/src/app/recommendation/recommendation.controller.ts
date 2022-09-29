import { RecommendationProfile, ROSIDetail } from '@libs';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { RecommendationService } from './services/recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/recommend')
  recommend(
    @Body() recommendationProfile: RecommendationProfile,
  ): Observable<any> {
    return this.recommendationService.recommend(recommendationProfile);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/calculate-rosi')
  calculateROSI(@Body() rosiDetail: ROSIDetail): Observable<ROSIDetail> {
    return this.recommendationService.calculateROSI(rosiDetail);
  }
}
