import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { Observable, Observer } from 'rxjs';

import { CompanyRawData } from '../models/company.interface';

export const readCSV = (): Observable<CompanyRawData[]> => {
  const csvFilePath = path.resolve(
    __dirname,
    '../../../assets/Data_10000_entries_test.csv',
  );

  const headers = [
    'EV',
    'capital',
    'cloud',
    'country',
    'identity_access',
    'industry',
    'insurance',
    'multifactor',
    'organizationSize',
    'remote',
    'security_measure',
    'security_training',
    'supplier',
    'year',
  ];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  return new Observable((observer: Observer<any>) => {
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      (error, result: object[]) => {
        if (error) {
          console.error(error);
        }
        observer.next(result);
        observer.complete();
      },
    );
  });
};
