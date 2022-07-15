import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentCalculatorService } from './investment-calculator.service';

describe('InvestmentCalculatorService', () => {
  let service: InvestmentCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentCalculatorService],
    }).compile();

    service = module.get<InvestmentCalculatorService>(InvestmentCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
