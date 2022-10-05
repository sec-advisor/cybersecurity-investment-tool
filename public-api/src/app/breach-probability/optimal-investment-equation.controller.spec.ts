import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { OptimalInvestmentEquationController } from './optimal-investment-equation.controller';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

describe('OptimalInvestmentEquationController', () => {
  let controller: OptimalInvestmentEquationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptimalInvestmentEquationController],
      providers: [
        OptimalInvestmentEquationService,
        {
          provide: getModelToken('optimal-investment-equations'),
          useValue: {},
        },
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
