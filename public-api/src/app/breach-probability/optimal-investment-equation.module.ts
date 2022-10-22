import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptimalInvestmentEquationSchema } from '../models/database.model';
import { SettingsModule } from '../settings/settings.module';
import { OptimalInvestmentEquationController } from './optimal-investment-equation.controller';
import { BpfValidatorService } from './services/bpf-validator.service';
import { OptimalInvestmentEquationService } from './services/optimal-investment-equation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'optimal-investment-equations',
        schema: OptimalInvestmentEquationSchema,
      },
    ]),
    SettingsModule,
  ],
  providers: [OptimalInvestmentEquationService, BpfValidatorService],
  exports: [OptimalInvestmentEquationService],
  controllers: [OptimalInvestmentEquationController],
})
export class OptimalInvestmentEquationModule {}
