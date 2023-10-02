import { Test, TestingModule } from '@nestjs/testing';
import { AnalyseCompaniesAverageCalculatorService } from './analyse-companies-average-calculator.service';

describe('AnalyseCompaniesAverageCalculatorService', () => {
  let service: AnalyseCompaniesAverageCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyseCompaniesAverageCalculatorService],
    }).compile();

    service = module.get<AnalyseCompaniesAverageCalculatorService>(
      AnalyseCompaniesAverageCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
