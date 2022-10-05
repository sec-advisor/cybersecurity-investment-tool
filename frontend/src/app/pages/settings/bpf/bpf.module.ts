import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { BpfRoutingModule } from './bpf-routing.module';
import { BpfComponent } from './bpf.component';
import { BpfAdvancedComponent } from './components/bpf-advanced/bpf-advanced.component';
import { BpfBasicComponent } from './components/bpf-basic/bpf-basic.component';
import { BpfGraphicComponent } from './components/bpf-graphic/bpf-graphic.component';
import { TestSegmentsComponent } from './components/test-segments/test-segments.component';

import { MathjaxModule } from "mathjax-angular";

@NgModule({
  imports: [
    CommonModule,
    BpfRoutingModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    MathjaxModule.forRoot({
      "config": {
        "loader": {
          "load": ['input/asciimath', "output/svg", "[tex]/require", "[tex]/ams"]
        },
        "tex": {
          "inlineMath": [["$", "$"]],
          "packages": ["base", "require", "ams"]
        },
        "svg": { "fontCache": "global" }
      },
      "src": "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js"
    })
  ],
  declarations: [
    BpfComponent,
    BpfBasicComponent,
    BpfAdvancedComponent,
    TestSegmentsComponent,
    BpfGraphicComponent,
  ],
})
export class BpfModule {}
