import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { readCSV } from '../helpers/csv-reader';
import { appendData } from '../helpers/data_appender';
import { findClosed, findClosed1 } from '../helpers/find_closest';
import { findSimilarity } from '../helpers/similarity';
import { Company } from '../models/company.interface';

@Injectable()
export class AnalyseCompaniesService {
  getSimilarity(compareCompany: Company) {
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
        },
      })),
    );
  }
}
