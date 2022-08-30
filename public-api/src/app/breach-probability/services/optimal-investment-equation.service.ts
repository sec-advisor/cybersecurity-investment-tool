import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';

import { OptimalInvestmentEquation } from '../../../../libs/api-interfaces';

@Injectable()
export class OptimalInvestmentEquationService {
  constructor(
    @InjectModel('optimal-investment-equations')
    private readonly optimalInvestmentModel: Model<OptimalInvestmentEquation>,
  ) {}

  getFunction(): Observable<OptimalInvestmentEquation> {
    return from(this.optimalInvestmentModel.find().exec()).pipe(
      map((functions) => functions[0]),
    );
  }
}
