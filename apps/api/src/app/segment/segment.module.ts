import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptimalInvestmentEquationModule } from '../breach-probability/optimal-investment-equation.module';
import { SegmentSchema } from '../models/database.model';
import { SegmentController } from './segment.controller';
import { InvestmentCalculatorService } from './services/investment-calculator.service';
import { SegmentService } from './services/segment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'segments', schema: SegmentSchema }]),
    OptimalInvestmentEquationModule
  ],
  controllers: [SegmentController],
  providers: [SegmentService, InvestmentCalculatorService]
})
export class SegmentModule { }
