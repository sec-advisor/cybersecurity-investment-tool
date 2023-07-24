import { Body, Controller, Post } from '@nestjs/common';

import { Company } from './models/company.interface';
import { AnalyseCompaniesService } from './services/analyse-companies.service';

@Controller('analyse-companies')
export class AnalyseCompaniesController {
  constructor(private analyseCompaniesService: AnalyseCompaniesService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post('')
  getSimilarCompanies(
    @Body() body: { company: Company; numberOfClosest?: number },
  ) {
    return this.analyseCompaniesService.getSimilarity(
      body.company,
      body.numberOfClosest,
    );
  }
}
