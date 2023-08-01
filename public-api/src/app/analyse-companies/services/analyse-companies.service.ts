import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';
import { map, Observable, of } from 'rxjs';

import { readCSV } from '../helpers/csv-reader';
import { findClosedEuclidean, findClosedPearson } from '../helpers/find_closest';
import { findSimilarity } from '../helpers/similarity';
import { sortEuclidean, sortPearson } from '../helpers/sorter';
import {
  Company,
  CompanyComparisonDto,
  CompanyDto,
  CompanyRawData,
  CompanyWithDistance,
  SharedCompanyData
} from '../models/company.interface';

@Injectable()
export class AnalyseCompaniesService {
  getSharedCompanyData(companyId: number): Observable<SharedCompanyData> {
    return of(this.readMockJsonFile()).pipe(
      map((companies) => companies.find((company) => company.id === companyId)),
      map((company) =>
        company.sharedData.reduce<SharedCompanyData>(
          (pre, curr) => ({ ...pre, [curr]: company[curr] }),
          {},
        ),
      ),
    );
  }

  getSimilarity(
    compareCompany: Company,
    numberOfClosest?: number,
  ): Observable<CompanyComparisonDto> {
    return (true ? of(this.readMockJsonFile()) : readCSV()).pipe(
      // map((companies) => appendData(companies) as CompanyRawData[]),
      // tap((x) => writeFileSync('test.json', JSON.stringify(x))),
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
    }));
  }

  private readMockJsonFile(): CompanyRawData[] {
    const jsonFilePath = path.resolve(
      __dirname,
      '../../../assets/1000_mock_companies_test.json',
    );

    return JSON.parse(readFileSync(jsonFilePath, 'utf-8'));
  }
}
