import { Body, Controller, Post } from '@nestjs/common';

import { Company } from './models/company.interface';
import { AnalyseCompaniesService } from './services/analyse-companies.service';

@Controller('analyse-companies')
export class AnalyseCompaniesController {
  constructor(private analyseCompaniesService: AnalyseCompaniesService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post('')
  getSimilarCompanies(@Body() body) {
    const compareCompany = body.company as Company;
    return this.analyseCompaniesService.getSimilarity(compareCompany);
  }
}
