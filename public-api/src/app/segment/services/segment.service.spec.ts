import { Test, TestingModule } from '@nestjs/testing';
import { SegmentService } from './segment.service';

describe('SegmentService', () => {
  let service: SegmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegmentService],
    }).compile();

    service = module.get<SegmentService>(SegmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
