import { Injectable } from '@nestjs/common';
import { CompanyRawData, SharedCompanyData } from '../models/company.interface';

@Injectable()
export class AnalyseCompaniesAverageCalculatorService {
  private readonly averageProperties: (keyof SharedCompanyData)[] = [
    'revenue',
    'marketShare',
    'growthRate',
    'cybersecurityBudget',
    'cybersecurityStaffing',
    'cybersecurityTrainingInvestment',
    'cybersecurityInsuranceInvestment',
    'cyberAttackThreats',
    'networkInfrastructure',
    'remoteAccess',
    'cybersecurityInvestment',
    'cloud',
    'multifactor',
    'remote',
  ];

  getAverageData(companies: CompanyRawData[]): SharedCompanyData {
    const combinedSharedData = companies.map((company) =>
      this.getSharedCompanyInformation(company),
    );

    const summarizedSharedProperties = combinedSharedData.reduce<
      { property: keyof SharedCompanyData; value: number; entries: number }[]
    >((pre, curr) => {
      this.averageProperties.forEach((averageProperty) => {
        if (Number.isFinite(curr[averageProperty])) {
          const tempObject = pre.find(
            (object) => object.property === averageProperty,
          );
          if (tempObject) {
            tempObject.value =
              tempObject.value + (curr[averageProperty] as number);
            tempObject.entries = tempObject.entries + 1;
          } else {
            pre.push({
              property: averageProperty,
              value: curr[averageProperty] as number,
              entries: 1,
            });
          }
        }
      });
      return pre;
    }, []);

    return summarizedSharedProperties.reduce<SharedCompanyData>((pre, curr) => {
      return { ...pre, [curr.property]: Math.round(curr.value / curr.entries) };
    }, {});
  }

  private getSharedCompanyInformation(
    company: CompanyRawData,
  ): SharedCompanyData {
    return company.sharedData.reduce<SharedCompanyData>(
      (pre, curr) => ({ ...pre, [curr]: company[curr] }),
      {},
    );
  }
}
