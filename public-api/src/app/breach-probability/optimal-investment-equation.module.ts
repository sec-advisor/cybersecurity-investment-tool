import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptimalInvestmentEquationSchema } from '../models/database.model';
import { OptimalInvestmentEquationController } from './optimal-investment-equation.controller';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'optimal-investment-equations',
        schema: OptimalInvestmentEquationSchema,
      },
    ]),
  ],
  providers: [OptimalInvestmentEquationService],
  exports: [OptimalInvestmentEquationService],
  controllers: [OptimalInvestmentEquationController],
})
export class OptimalInvestmentEquationModule {}
