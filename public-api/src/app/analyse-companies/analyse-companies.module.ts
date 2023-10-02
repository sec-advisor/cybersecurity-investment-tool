import { Module } from '@nestjs/common';

import { AnalyseCompaniesController } from './analyse-companies.controller';
import { AnalyseCompaniesService } from './services/analyse-companies.service';
import { AnalyseCompaniesAverageCalculatorService } from './services/analyse-companies-average-calculator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '../models/database.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'companies', schema: CompanySchema }]),
  ],
  controllers: [AnalyseCompaniesController],
  providers: [
    AnalyseCompaniesService,
    AnalyseCompaniesAverageCalculatorService,
  ],
})
export class AnalyseCompaniesModule {}
