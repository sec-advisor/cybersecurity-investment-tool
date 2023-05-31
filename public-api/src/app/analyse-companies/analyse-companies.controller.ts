import { Controller, Get } from '@nestjs/common';

import { AnalyseCompaniesService } from './services/analyse-companies.service';

@Controller('analyse-companies')
export class AnalyseCompaniesController {
  constructor(private analyseCompaniesService: AnalyseCompaniesService) { }

  // @UseGuards(AuthenticatedGuard)
  @Get('')
  getSegmentDetail() {
    console.log('hit')
    return this.analyseCompaniesService.getSimilarity();
  }
}
