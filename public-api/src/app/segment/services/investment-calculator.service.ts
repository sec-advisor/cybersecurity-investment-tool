import { OptimalInvestmentEquation, Segment } from '@libs';
import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const linspace = require('@stdlib/array-base-linspace');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nerdamer = require('nerdamer/all.min');

@Injectable()
export class InvestmentCalculatorService {
  calculateInvestments(
    segments: Segment[],
    equation: OptimalInvestmentEquation,
  ): Observable<Segment[]> {
    return of(segments).pipe(
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          calculatedVulnerability: this.getCalculatedVulnerability(segment),
        })),
      ),
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          optimalInvestment: this.getOptimalInvestment(
            segment,
            segments,
            equation,
          ),
          expectedLossBeforeInvestment:
            this.getExpectedLossBeforeInvestment(segment),
        })),
      ),
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          enbisCurve: this.getENBISCurve(segment, equation),
        })),
      ),
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          expectedLossWithInvestment: this.getLossWithInvestment(
            segment,
            segments,
            equation,
          ),
        })),
      ),
      map((segments) =>
        segments.map((segment) => ({
          ...segment,
          totalCybersecurityCosts: this.getTotalCybersecurityCosts(segment),
        })),
      ),
    );
  }

  calculateInvestmentsWithoutSegmentation(
    segments: Segment[],
    equation: OptimalInvestmentEquation,
  ): Observable<Partial<Segment>> {
    return of({
      value: this.getTotalValue(segments),
      calculatedVulnerability: this.getWeightedVulnerability(segments),
    }).pipe(
      map((segmentation) => ({
        ...segmentation,
        expectedLossBeforeInvestment:
          this.getExpectedLossBeforeInvestment(segmentation),
        optimalInvestment: this.getOptimalInvestment(
          segmentation,
          segments,
          equation,
        ),
      })),
      map((segmentation) => ({
        ...segmentation,
        expectedLossWithInvestment: this.getLossWithInvestment(
          segmentation,
          segments,
          equation,
        ),
      })),
      map((segmentation) => ({
        ...segmentation,
        totalCybersecurityCosts: this.getTotalCybersecurityCosts(segmentation),
      })),
    );
  }

  private getExpectedLossBeforeInvestment(
    segment: Segment | Partial<Segment>,
  ): number {
    return segment.value * segment.calculatedVulnerability;
  }

  private getCalculatedVulnerability(segment: Segment): number {
    return (
      Math.round((segment.risk / 100) * (segment.vulnerability / 100) * 100) /
      100
    );
  }

  private getOptimalInvestment(
    segment: Segment | Partial<Segment>,
    segments: Segment[],
    investmentEquation: OptimalInvestmentEquation,
  ): number {
    const bpf = nerdamer(investmentEquation.breachProbabilityFunction);
    const diff = nerdamer.diff(bpf, 'z');
    const optimalInvestmentEquation = nerdamer(
      investmentEquation.optimalInvestmentEquation,
      { S: `(${diff.toString()})` },
    ).evaluate();
    const equationWithParameters = optimalInvestmentEquation.evaluate({
      L: this.getTotalValue(segments),
      v: segment.calculatedVulnerability,
      z: `(z/${segment.value / this.getTotalValue(segments)})`,
    });
    const extremes = equationWithParameters.solveFor('z');
    const extremesObject = {
      first: nerdamer(extremes[0].toString()).evaluate(),
      second: nerdamer(extremes[1].toString()).evaluate(),
    };
    const result =
      Number(extremesObject.first) > Number(extremesObject.second)
        ? extremesObject.first
        : extremesObject.second;
    return Math.round(+result.text());
  }

  private getTotalValue(segments: Segment[]): number {
    return segments.reduce((pre, curr) => pre + curr.value, 0);
  }

  private getLossWithInvestment(
    segment: Segment | Partial<Segment>,
    segments: Segment[],
    investmentEquation: OptimalInvestmentEquation,
  ): number {
    // Si*Li
    const lossWithInvestment = nerdamer(
      `${investmentEquation.breachProbabilityFunction}*Li`,
      {
        L: this.getTotalValue(segments),
        Li: segment.value,
        v: segment.calculatedVulnerability,
        z:
          segment.optimalInvestment /
          (segment.value / this.getTotalValue(segments)),
      },
      'numer',
    );

    return Math.round(+lossWithInvestment.text());
  }

  private getTotalCybersecurityCosts(
    segment: Segment | Partial<Segment>,
  ): number {
    return segment.optimalInvestment + segment.expectedLossWithInvestment;
  }

  private getWeightedVulnerability(segments: Segment[]): number {
    if (
      segments.every((segment) =>
        Number.isFinite(segment.calculatedVulnerability),
      )
    ) {
      const weightedAverage = segments.reduce(
        (pre, curr) => pre + curr.value * curr.calculatedVulnerability,
        0,
      );
      return (
        Math.round((weightedAverage / this.getTotalValue(segments)) * 100) / 100
      );
    } else {
      return 0;
    }
  }

  private getEBIS(
    segment: Segment | Partial<Segment>,
    investmentEquation: OptimalInvestmentEquation,
    z: number,
  ): number {
    const formula = nerdamer(
      `(v-${investmentEquation.breachProbabilityFunction})*L`,
    );
    return formula.evaluate({
      v: segment.calculatedVulnerability,
      z: z,
      L: segment.value,
    });
  }

  private getENBIS(
    segment: Segment | Partial<Segment>,
    investmentEquation: OptimalInvestmentEquation,
    z: number,
  ): number {
    return this.getEBIS(segment, investmentEquation, z) - z;
  }

  private getENBISCurve(
    segment: Segment | Partial<Segment>,
    investmentEquation: OptimalInvestmentEquation,
  ) {
    const start = 0;
    const end = segment.optimalInvestment * 2; // Currently just twice the optimal investment so we can see something.
    const resolution = 101; // Higher means more resolution but also more calculation, odd number ensures that the optimal value is also a point.

    const xValues = linspace(start, end, resolution);

    const calculatedPoints = xValues.map((x) => ({
      investment: x,
      enbis: this.getENBIS(segment, investmentEquation, x),
    }));
    return calculatedPoints.filter((point) => point.enbis >= 0);
  }
}
