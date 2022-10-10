import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SettingsService } from '../../settings/services/settings.service';
import { OptimalInvestmentEquationService } from './optimal-investment-equation.service';

describe('OptimalInvestmentEquationService', () => {
  let service: OptimalInvestmentEquationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('optimal-investment-equations'),
          useValue: {},
        },
        { provide: getModelToken('settings'), useValue: {} },
        OptimalInvestmentEquationService,
        SettingsService,
      ],
    }).compile();

    service = module.get<OptimalInvestmentEquationService>(
      OptimalInvestmentEquationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
