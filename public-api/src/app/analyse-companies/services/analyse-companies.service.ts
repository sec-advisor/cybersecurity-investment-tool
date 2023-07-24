import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { readCSV } from '../helpers/csv-reader';
import { appendData } from '../helpers/data_appender';
import { findClosed, findClosed1 } from '../helpers/find_closest';
import { findSimilarity } from '../helpers/similarity';
import { sortEuclidean, sortPearson } from '../helpers/sorter';
import { Company } from '../models/company.interface';

@Injectable()
export class AnalyseCompaniesService {
  getSimilarity(compareCompany: Company, numberOfClosest?: number) {
    return readCSV().pipe(
      map((data) => appendData(data)),
      map((data) => findSimilarity(compareCompany, data)),
      map((data) => ({
        data,
        closed: {
          businessEuclidean: findClosed(data, 'euclideanDistanceBusiness'),
          economicEuclidean: findClosed(data, 'euclideanDistanceEconomic'),
          technicalEuclidean: findClosed(data, 'euclideanDistanceTechnical'),
          businessPearson: findClosed1(data, 'pearsonCorrelationBusiness'),
          economicPearson: findClosed1(data, 'pearsonCorrelationEconomic'),
          technicalPearson: findClosed1(data, 'pearsonCorrelationTechnical'),
        },
        sorted: {
          euclideanDistanceBusiness: sortEuclidean(
            data,
            'euclideanDistanceBusiness',
            numberOfClosest,
          ),
          euclideanDistanceEconomic: sortEuclidean(
            data,
            'euclideanDistanceEconomic',
            numberOfClosest,
          ),
          euclideanDistanceTechnical: sortEuclidean(
            data,
            'euclideanDistanceTechnical',
            numberOfClosest,
          ),
          pearsonCorrelationBusiness: sortPearson(
            data,
            'pearsonCorrelationBusiness',
            numberOfClosest,
          ),
          pearsonCorrelationEconomic: sortPearson(
            data,
            'pearsonCorrelationEconomic',
            numberOfClosest,
          ),
          pearsonCorrelationTechnical: sortPearson(
            data,
            'pearsonCorrelationTechnical',
            numberOfClosest,
          ),
        },
      })),
    );
  }
}
