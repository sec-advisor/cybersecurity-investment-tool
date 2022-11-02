import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MathjaxModule } from 'mathjax-angular';

import { LayoutsModule } from '../../../layouts/layouts.module';
import { BpfRoutingModule } from './bpf-routing.module';
import { BpfComponent } from './bpf.component';
import { BpfAdvancedComponent } from './components/bpf-advanced/bpf-advanced.component';
import { BpfBasicComponent } from './components/bpf-basic/bpf-basic.component';
import { BpfBarGraphComponent } from './components/bpf-bar-graph/bpf-bar-graph.component';
import { BpfLineGraphComponent } from './components/bpf-line-graph/bpf-line-graph.component';
import { TestSegmentsComponent } from './components/test-segments/test-segments.component';
import { MathJaxDirective } from './directives/math-jax.directive';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    BpfRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    MathjaxModule.forRoot({
      config: {
        loader: {
          load: ['input/asciimath', 'output/svg', '[tex]/require', '[tex]/ams'],
        },
        tex: {
          inlineMath: [['$', '$']],
          packages: ['base', 'require', 'ams'],
        },
        svg: { fontCache: 'global' },
      },
      src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js',
    }),
    NgxChartsModule,
  ],
  declarations: [
    BpfComponent,
    BpfBasicComponent,
    BpfAdvancedComponent,
    TestSegmentsComponent,
    BpfBarGraphComponent,
    BpfLineGraphComponent,
    MathJaxDirective,
  ],
})
export class BpfModule {}
