import { Module } from '@nestjs/common';

import { OptimalInvestmentEquationModule } from '../breach-probability/optimal-investment-equation.module';
import { SegmentModule } from '../segment/segment.module';
import { SettingsController } from './settings.controller';

@Module({
  imports: [OptimalInvestmentEquationModule, SegmentModule],
  controllers: [SettingsController],
})
export class SettingsModule {}
