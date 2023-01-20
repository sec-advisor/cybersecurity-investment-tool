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
import { chartData } from './data';

@Component({
  selector: 'app-bpf-line-graph',
  templateUrl: './bpf-line-graph.component.html',
  styleUrls: ['./bpf-line-graph.component.scss'],
})
export class BpfLineGraphComponent implements OnInit, OnChanges, OnDestroy {
  private readonly subscriber = new Subscriber();

  selectedSegmentIndex = 0;
  chartData: any[] = [...chartData];
  equation?: string;
  multi: any[] = [...this.chartData[this.selectedSegmentIndex]];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  legendPosition = LegendPosition.Below;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Investment';
  xAxisTickFormatting = (value: any) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  showYAxisLabel = true;
  yAxisLabel = 'ENBIS';
  yAxisTickFormatting = (value: any) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  selectedData = this.multi[this.selectedSegmentIndex];

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
    const segments = changes['segments']?.currentValue as Segment[];
    if (segments) {
      this.changedSegments(segments);
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private changedSegments(segments: Segment[]): void {
    segments.forEach((segment, index) => {
      if (segment && segment.enbisCurve) {
        this.chartData[index][1].series = segment.enbisCurve.map((point) => ({
          name: point.investment,
          value: point.enbis,
        }));
      }
    });
    this.chartData = [...this.chartData];

    this.updateSelected(this.selectedSegmentIndex);
  }

  updateSelected(newSelectedSegmentIndex: number): void {
    this.selectedSegmentIndex = newSelectedSegmentIndex;
    this.multi = [...this.chartData[newSelectedSegmentIndex]];
  }
}
