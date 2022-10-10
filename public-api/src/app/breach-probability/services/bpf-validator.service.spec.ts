import { Test, TestingModule } from '@nestjs/testing';
import { BpfValidatorService } from './bpf-validator.service';

describe('BpfValidatorService', () => {
  let service: BpfValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpfValidatorService],
    }).compile();

    service = module.get<BpfValidatorService>(BpfValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
