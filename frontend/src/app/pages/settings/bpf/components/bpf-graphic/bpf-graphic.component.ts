import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Segment } from '@libs';

@Component({
  selector: 'app-bpf-graphic',
  templateUrl: './bpf-graphic.component.html',
  styleUrls: ['./bpf-graphic.component.scss'],
})
export class BpfGraphicComponent implements OnInit, OnChanges {
  @Input() bpf?: string;
  @Input() segments?: Segment[];

  constructor() {}

  ngOnInit() {
    console.log('here you can perform stuff when the component is mounted');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const bpf = changes['bpf']?.currentValue as string;
    const segments = changes['segments']?.currentValue as Segment[];
    if (bpf && segments) {
      this.doSomething(bpf, segments);
    }
  }

  doSomething(bpf: string, segments: Segment[]): void {
    console.log(bpf, segments);
  }
}
