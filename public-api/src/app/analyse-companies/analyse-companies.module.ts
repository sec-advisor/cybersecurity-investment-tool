import { Module } from '@nestjs/common';

import { AnalyseCompaniesController } from './analyse-companies.controller';
import { AnalyseCompaniesService } from './services/analyse-companies.service';
import { AnalyseCompaniesAverageCalculatorService } from './services/analyse-companies-average-calculator.service';

@Module({
  controllers: [AnalyseCompaniesController],
  providers: [
    AnalyseCompaniesService,
    AnalyseCompaniesAverageCalculatorService,
  ],
})
export class AnalyseCompaniesModule {}
