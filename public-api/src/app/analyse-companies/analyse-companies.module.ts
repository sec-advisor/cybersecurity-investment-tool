import { Module } from '@nestjs/common';

import { AnalyseCompaniesController } from './analyse-companies.controller';
import { AnalyseCompaniesService } from './services/analyse-companies.service';

@Module({
  controllers: [AnalyseCompaniesController],
  providers: [AnalyseCompaniesService],
})
export class AnalyseCompaniesModule {}
