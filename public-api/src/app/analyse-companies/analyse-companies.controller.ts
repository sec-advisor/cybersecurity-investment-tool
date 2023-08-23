import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  CompaniesSummary,
  Company,
  CompanyComparisonDto,
  SharedCompanyData,
} from './models/company.interface';
import { AnalyseCompaniesService } from './services/analyse-companies.service';

@Controller('analyse-companies')
export class AnalyseCompaniesController {
  constructor(private analyseCompaniesService: AnalyseCompaniesService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post('')
  getSimilarCompanies(
    @Body() body: { company: Company; numberOfClosest?: number },
  ): Observable<CompanyComparisonDto> {
    return this.analyseCompaniesService.getSimilarity(
      body.company,
      body.numberOfClosest,
    );
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('company/:companyId')
  getSharedCompanyData(
    @Param('companyId') companyId: string,
  ): Observable<{ company: SharedCompanyData; average: CompaniesSummary }> {
    return this.analyseCompaniesService.getSharedCompanyData(Number(companyId));
  }
}
