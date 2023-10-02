import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { from, map, Observable, of, tap } from 'rxjs';

import { readCSV } from '../helpers/csv-reader';
import {
  findClosedEuclidean,
  findClosedPearson,
} from '../helpers/find_closest';
import { findSimilarity } from '../helpers/similarity';
import { sortEuclidean, sortPearson } from '../helpers/sorter';
import {
  CompaniesSummary,
  Company,
  CompanyComparisonDto,
  CompanyDto,
  CompanyRawData,
  CompanyWithDistance,
  SharedCompanyData,
} from '../models/company.interface';
import { AnalyseCompaniesAverageCalculatorService } from './analyse-companies-average-calculator.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';

@Injectable()
export class AnalyseCompaniesService {
  constructor(
    @InjectModel('companies')
    private readonly companiesModel: Model<CompanyRawData>,
    private analyseCompaniesAverageCalculatorService: AnalyseCompaniesAverageCalculatorService,
  ) {}

  getSharedCompanyData(
    companyId: number,
  ): Observable<{ company: SharedCompanyData; average: CompaniesSummary }> {
    return of(this.readMockJsonFile()).pipe(
      map((companies) => ({
        company: this.getSharedCompanyInformation(
          companies.find((company) => company.id === companyId),
        ),
        average:
          this.analyseCompaniesAverageCalculatorService.getAverageData(
            companies,
          ),
      })),
    );
  }

  getSimilarity(
    compareCompany: Company,
    compareCompanies?: CompanyRawData[],
    numberOfClosest?: number,
  ): Observable<CompanyComparisonDto> {
    return (
      compareCompanies
        ? of(compareCompanies)
        : from(this.companiesModel.find().exec()).pipe(
            map((companies) => this.mapToCompanyModel(companies)),
          )
    ).pipe(
      map((companies) => findSimilarity(compareCompany, companies)),
      map((companies) => this.filterCompanyInformation(companies)),
      map((companies) => ({
        data: companies,
        closed: {
          businessEuclidean: findClosedEuclidean(companies, 'business'),
          economicEuclidean: findClosedEuclidean(companies, 'economic'),
          technicalEuclidean: findClosedEuclidean(companies, 'technical'),
          businessPearson: findClosedPearson(companies, 'business'),
          economicPearson: findClosedPearson(companies, 'economic'),
          technicalPearson: findClosedPearson(companies, 'technical'),
        },
        sorted: {
          euclideanDistanceBusiness: sortEuclidean(
            companies,
            'business',
            numberOfClosest,
          ),
          euclideanDistanceEconomic: sortEuclidean(
            companies,
            'economic',
            numberOfClosest,
          ),
          euclideanDistanceTechnical: sortEuclidean(
            companies,
            'technical',
            numberOfClosest,
          ),
          euclideanDistanceAll: sortEuclidean(
            companies,
            'all',
            numberOfClosest,
          ),
          pearsonCorrelationBusiness: sortPearson(
            companies,
            'business',
            numberOfClosest,
          ),
          pearsonCorrelationEconomic: sortPearson(
            companies,
            'economic',
            numberOfClosest,
          ),
          pearsonCorrelationTechnical: sortPearson(
            companies,
            'technical',
            numberOfClosest,
          ),
          pearsonCorrelationAll: sortPearson(companies, 'all', numberOfClosest),
        },
      })),
      map((data) => data.sorted),
    );
  }

  private filterCompanyInformation(
    companies: CompanyWithDistance[],
  ): CompanyDto[] {
    return companies.map((company) => ({
      id: company.id,
      euclideanDistanceBusiness: company.euclideanDistanceBusiness,
      euclideanDistanceEconomic: company.euclideanDistanceEconomic,
      euclideanDistanceTechnical: company.euclideanDistanceTechnical,
      pearsonCorrelationBusiness: company.pearsonCorrelationBusiness,
      pearsonCorrelationEconomic: company.pearsonCorrelationEconomic,
      pearsonCorrelationTechnical: company.pearsonCorrelationTechnical,
      euclideanDistanceAll: company.euclideanDistanceAll,
      pearsonCorrelationAll: company.pearsonCorrelationAll,
    }));
  }

  private readMockJsonFile(): CompanyRawData[] {
    const jsonFilePath = path.resolve(
      __dirname,
      '../../../assets/1000_mock_companies_test.json',
    );

    return JSON.parse(readFileSync(jsonFilePath, 'utf-8'));
  }

  private getSharedCompanyInformation(
    company: CompanyRawData,
  ): SharedCompanyData {
    return company.sharedData.reduce<SharedCompanyData>(
      (pre, curr) => ({ ...pre, [curr]: company[curr] }),
      {},
    );
  }

  private mapToCompanyModel(
    companies: (Document<unknown, any, CompanyRawData> &
      CompanyRawData & {
        _id: Types.ObjectId;
      })[],
  ): CompanyRawData[] {
    return companies.map((company) => ({
      id: company.id,
      revenue: company.revenue,
      marketShare: company.marketShare,
      growthRate: company.growthRate,
      cybersecurityBudget: company.cybersecurityBudget,
      cybersecurityStaffing: company.cybersecurityStaffing,
      cybersecurityTrainingInvestment: company.cybersecurityTrainingInvestment,
      cybersecurityInsuranceInvestment:
        company.cybersecurityInsuranceInvestment,
      cyberAttackThreats: company.cyberAttackThreats,
      networkInfrastructure: company.networkInfrastructure,
      remoteAccess: company.remoteAccess,
      cybersecurityInvestment: company.cybersecurityInvestment,
      cloud: company.cloud,
      country: company.country,
      multifactor: company.multifactor,
      organizationSize: company.organizationSize,
      remote: company.remote,
      bpf: company.bpf,
      sharedData: company.sharedData,
    }));
  }
}
