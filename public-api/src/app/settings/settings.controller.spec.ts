import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { OptimalInvestmentEquationService } from '../breach-probability/services/optimal-investment-equation.service';
import { InvestmentCalculatorService } from '../segment/services/investment-calculator.service';
import { SettingsController } from './settings.controller';

describe('SettingsController', () => {
  let controller: SettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        { provide: getModelToken('segments'), useValue: {} },
        {
          provide: getModelToken('optimal-investment-equations'),
          useValue: {},
        },
        InvestmentCalculatorService,
        OptimalInvestmentEquationService,
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
