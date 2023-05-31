import { Test, TestingModule } from '@nestjs/testing';
import { AnalyseCompaniesService } from './analyse-companies.service';

describe('AnalyseCompaniesService', () => {
  let service: AnalyseCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyseCompaniesService],
    }).compile();

    service = module.get<AnalyseCompaniesService>(AnalyseCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
