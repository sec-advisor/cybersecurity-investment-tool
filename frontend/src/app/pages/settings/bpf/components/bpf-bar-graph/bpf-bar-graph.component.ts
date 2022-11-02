import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Segment } from '@libs';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Subscriber } from 'rxjs';

import { EquationDataService } from '../../../../../services/backend/equation-data.service';

@Component({
  selector: 'app-bpf-bar-graph',
  templateUrl: './bpf-bar-graph.component.html',
  styleUrls: ['./bpf-bar-graph.component.scss'],
})
export class BpfBarGraphComponent implements OnInit, OnChanges, OnDestroy {
  private readonly subscriber = new Subscriber();

  equation?: string;
  multi: any[] = [
    {
      name: 'Customers Db',
      series: [
        {
          name: 'GL BPF',
          value: 2280000,
        },
        {
          name: 'Your BPF',
          value:
            (this.segments &&
              this.segments[0] &&
              this.segments[0].optimalInvestment) ||
            0,
        },
      ],
    },

    {
      name: 'Internal Operations Db',
      series: [
        {
          name: 'GL BPF',
          value: 788528,
        },
        {
          name: 'Your BPF',
          value:
            (this.segments &&
              this.segments[1] &&
              this.segments[0].optimalInvestment) ||
            0,
        },
      ],
    },

    {
      name: 'External Operations Db',
      series: [
        {
          name: 'GL BPF',
          value: 180000,
        },
        {
          name: 'Your BPF',
          value:
            (this.segments &&
              this.segments[2] &&
              this.segments[0].optimalInvestment) ||
            0,
        },
      ],
    },
  ];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  legendPosition = LegendPosition.Below;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Segment';
  showYAxisLabel = true;
  yAxisLabel = 'Optimal investment';
  yAxisTickFormatting = (value: any) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  @Input() bpf?: string;
  @Input() segments?: Segment[];

  constructor(private equationDataService: EquationDataService) {}

  ngOnInit() {
    this.subscriber.add(
      this.equationDataService
        .getEquation()
        .subscribe((equation) => (this.equation = equation)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const bpf = changes['bpf']?.currentValue as string;
    const segments = changes['segments']?.currentValue as Segment[];
    if (segments) {
      this.changedSegments(segments);
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private changedSegments(segments: Segment[]): void {
    // Update the data for the graph
    [...Array(3).keys()].forEach((i) => {
      this.multi[i].series[1].value = segments[i].optimalInvestment;
    });
    this.multi = [...this.multi];
  }
}
