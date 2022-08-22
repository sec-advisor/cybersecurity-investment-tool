import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProfileService } from './business-profile.service';

describe('BusinessProfileService', () => {
  let service: BusinessProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProfileService],
    }).compile();

    service = module.get<BusinessProfileService>(BusinessProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
