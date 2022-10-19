import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Segment } from '@libs';
import { Subscriber } from 'rxjs';

import { EquationDataService } from '../../../../../services/backend/equation-data.service';

@Component({
  selector: 'app-bpf-graphic',
  templateUrl: './bpf-graphic.component.html',
  styleUrls: ['./bpf-graphic.component.scss'],
})
export class BpfGraphicComponent implements OnInit, OnChanges, OnDestroy {
  private readonly subscriber = new Subscriber();

  equation?: string;

  @Input() bpf?: string;
  @Input() segments?: Segment[];

  constructor(private equationDataService: EquationDataService) {}

  multi: any[] = [
    {
      "name": "Customers Db",
      "series": [
        {
          "name": "Normal BPF",
          "value": 2280000
        },
        {
          "name": "Your BPF",
          "value": this.segments && this.segments[0] && this.segments[0].optimalInvestment|| 0
        }
      ]
    },

    {
      "name": "Internal Operations Db",
      "series": [
        {
          "name": "Normal BPF",
          "value": 7870000
        },
        {
          "name": "Your BPF",
          "value": this.segments && this.segments[1] && this.segments[0].optimalInvestment|| 0
        }
      ]
    },

    {
      "name": "External Operations Db",
      "series": [
        {
          "name": "Normal BPF",
          "value": 180000
        },
        {
          "name": "Your BPF",
          "value": this.segments && this.segments[2] && this.segments[0].optimalInvestment || 0
        }
      ]
    }
  ];
  ngOnInit() {
    this.subscriber.add(
      this.equationDataService
        .getEquation()
        .subscribe((equation) => (this.equation = equation)),
    );

    console.log('here you can perform stuff when the component is mounted');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const bpf = changes['bpf']?.currentValue as string;
    const segments = changes['segments']?.currentValue as Segment[];
    if (bpf && segments) {
      this.doSomething(bpf, segments);
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  doSomething(bpf: string, segments: Segment[]): void {
    console.log(bpf, segments);
  }
}
