import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SegmentDefinitionController } from './segment-definition.controller';
import { SegmentDefinitionService } from './services/segment-definition.service';

describe('SegmentDefinitionController', () => {
  let controller: SegmentDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentDefinitionController],
      providers: [
        { provide: getModelToken('segment-definitions'), useValue: {} },
        SegmentDefinitionService,
      ],
    }).compile();

    controller = module.get<SegmentDefinitionController>(
      SegmentDefinitionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
