import { Test, TestingModule } from '@nestjs/testing';
import { AnalyseCompaniesController } from './analyse-companies.controller';

describe('AnalyseCompaniesController', () => {
  let controller: AnalyseCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyseCompaniesController],
    }).compile();

    controller = module.get<AnalyseCompaniesController>(
      AnalyseCompaniesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
