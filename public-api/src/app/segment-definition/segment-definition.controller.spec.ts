import { Test, TestingModule } from '@nestjs/testing';
import { SegmentDefinitionController } from './segment-definition.controller';

describe('SegmentDefinitionController', () => {
  let controller: SegmentDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentDefinitionController],
    }).compile();

    controller = module.get<SegmentDefinitionController>(SegmentDefinitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
