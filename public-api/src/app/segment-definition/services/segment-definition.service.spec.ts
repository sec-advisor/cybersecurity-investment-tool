import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SegmentDefinitionService } from './segment-definition.service';

describe('SegmentDefinitionService', () => {
  let service: SegmentDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getModelToken('segment-definitions'), useValue: {} },
        SegmentDefinitionService,
      ],
    }).compile();

    service = module.get<SegmentDefinitionService>(SegmentDefinitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
