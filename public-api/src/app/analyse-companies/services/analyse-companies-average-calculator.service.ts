import { Injectable } from '@nestjs/common';
import {
  CompaniesSummary,
  CompanyRawData,
  SharedCompanyData,
} from '../models/company.interface';

interface NumericAggregation {
  property: keyof SharedCompanyData;
  value: number;
  entries: number;
}

interface NoneNumericAggregation {
  property: keyof SharedCompanyData;
  choices: { choice: number | string; entries: number }[];
}

@Injectable()
export class AnalyseCompaniesAverageCalculatorService {
  private readonly numericAverageProperties: (keyof SharedCompanyData)[] = [
    'revenue',
    'marketShare',
    'growthRate',
    'cybersecurityBudget',
    'cybersecurityStaffing',
    'cybersecurityTrainingInvestment',
    'cybersecurityInsuranceInvestment',
    'cybersecurityInvestment',
    'remote',
  ];
  private readonly noneNumericAverageProperties: (keyof SharedCompanyData)[] = [
    'country',
    'cyberAttackThreats',
    'networkInfrastructure',
    'remoteAccess',
    'cloud',
    'multifactor',
  ];

  getAverageData(companies: CompanyRawData[]): CompaniesSummary {
    const combinedSharedData = companies.map((company) =>
      this.getSharedCompanyInformation(company),
    );

    const summarizedSharedProperties = combinedSharedData.reduce<{
      numericAggregation: NumericAggregation[];
      noneNumericAggregation: NoneNumericAggregation[];
    }>(
      (pre, curr) => {
        this.handleNumericProperties(curr, pre.numericAggregation);
        this.handleNoneNumericProperties(curr, pre.noneNumericAggregation);
        return pre;
      },
      { numericAggregation: [], noneNumericAggregation: [] },
    );

    const numericSummaryObject =
      summarizedSharedProperties.numericAggregation.reduce<SharedCompanyData>(
        (pre, curr) => {
          return {
            ...pre,
            [curr.property]: Math.round(curr.value / curr.entries),
          };
        },
        {},
      );

    const noneNumericSummaryObject =
      summarizedSharedProperties.noneNumericAggregation.reduce<CompaniesSummary>(
        (pre, curr) => {
          const mostCommonValue = curr.choices.sort(
            (a, b) => b.entries - a.entries,
          )?.[0];

          const percentage =
            mostCommonValue.entries /
            curr.choices.reduce<number>((pre, curr) => pre + curr.entries, 0);

          return {
            ...pre,
            [curr.property]: mostCommonValue.choice,
            [`${curr.property}Percentage`]: Math.round(percentage * 100) / 100,
          };
        },
        {} as CompaniesSummary,
      );

    return { ...numericSummaryObject, ...noneNumericSummaryObject };
  }

  private handleNumericProperties(
    curr: SharedCompanyData,
    pre: NumericAggregation[],
  ) {
    this.numericAverageProperties.forEach((averageProperty) => {
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
  }

  private handleNoneNumericProperties(
    curr: SharedCompanyData,
    pre: NoneNumericAggregation[],
  ) {
    this.noneNumericAverageProperties.forEach((averageProperty) => {
      const currentValue = curr[averageProperty];

      if (currentValue !== undefined) {
        const tempObject = pre.find(
          (object) => object.property === averageProperty,
        );
        if (tempObject) {
          const choice = tempObject.choices.find(
            (choice) => choice.choice === currentValue,
          );
          if (choice) {
            choice.entries = choice.entries + 1;
          } else {
            tempObject.choices.push({ choice: currentValue, entries: 1 });
          }
        } else {
          pre.push({
            property: averageProperty,
            choices: [{ choice: currentValue, entries: 1 }],
          });
        }
      }
    });
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
