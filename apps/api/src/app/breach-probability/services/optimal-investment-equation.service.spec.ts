import { Test, TestingModule } from '@nestjs/testing';

import { OptimalInvestmentEquationService } from './optimal-investment-equation.service';

describe('OptimalInvestmentEquationService', () => {
  let service: OptimalInvestmentEquationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimalInvestmentEquationService],
    }).compile();

    service = module.get<OptimalInvestmentEquationService>(OptimalInvestmentEquationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
