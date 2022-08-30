import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './services/recommendation.service';

describe('RecommendationController', () => {
  let controller: RecommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [RecommendationController],
      providers: [
        { provide: HttpService, useValue: {} },
        RecommendationService,
      ],
    }).compile();

    controller = module.get<RecommendationController>(RecommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
