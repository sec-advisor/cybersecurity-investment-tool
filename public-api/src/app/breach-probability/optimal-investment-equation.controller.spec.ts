import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SettingsService } from '../settings/services/settings.service';
import { OptimalInvestmentEquationController } from './optimal-investment-equation.controller';
import { BpfValidatorService } from './services/bpf-validator.service';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

describe('OptimalInvestmentEquationController', () => {
  let controller: OptimalInvestmentEquationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptimalInvestmentEquationController],
      providers: [
        BpfValidatorService,
        OptimalInvestmentEquationService,
        SettingsService,
        {
          provide: getModelToken('optimal-investment-equations'),
          useValue: {},
        },
        { provide: getModelToken('settings'), useValue: {} },
      ],
    }).compile();

    controller = module.get<OptimalInvestmentEquationController>(
      OptimalInvestmentEquationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
