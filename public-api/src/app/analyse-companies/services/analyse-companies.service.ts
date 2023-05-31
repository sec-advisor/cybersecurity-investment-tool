import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { readCSV } from '../helpers/csv-reader';
import { appendData } from '../helpers/data_appender';
import { findClosed, findClosed1 } from '../helpers/find_closest';
import { findSimilarity } from '../helpers/similarity';

@Injectable()
export class AnalyseCompaniesService {
  getSimilarity() {
    return readCSV().pipe(
      map((data) => appendData(data)),
      map((data) => findSimilarity(data)),
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
