import { HttpModule, Module } from '@nestjs/common';

import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './services/recommendation.service';

@Module({
  imports: [HttpModule],
  controllers: [RecommendationController],
  providers: [RecommendationService]
})
export class RecommendationModule { }
