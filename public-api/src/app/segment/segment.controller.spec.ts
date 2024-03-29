import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { OptimalInvestmentEquationService } from '../breach-probability/services/optimal-investment-equation.service';
import { SettingsService } from '../settings/services/settings.service';
import { SegmentController } from './segment.controller';
import { InvestmentCalculatorService } from './services/investment-calculator.service';
import { SegmentService } from './services/segment.service';

describe('SegmentController', () => {
  let controller: SegmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentController],
      providers: [
        { provide: getModelToken('segments'), useValue: {} },
        {
          provide: getModelToken('optimal-investment-equations'),
          useValue: {},
        },
        { provide: getModelToken('settings'), useValue: {} },
        InvestmentCalculatorService,
        SegmentService,
        OptimalInvestmentEquationService,
        SettingsService,
      ],
    }).compile();

    controller = module.get<SegmentController>(SegmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
