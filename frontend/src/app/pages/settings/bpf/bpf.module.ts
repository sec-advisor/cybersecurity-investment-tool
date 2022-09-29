import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { BpfRoutingModule } from './bpf-routing.module';
import { BpfComponent } from './bpf.component';
import { BpfBasicComponent } from './components/bpf-basic/bpf-basic.component';
import { BpfGraphicComponent } from './components/bpf-graphic/bpf-graphic.component';
import { TestSegmentsComponent } from './components/test-segments/test-segments.component';

@NgModule({
  imports: [
    CommonModule,
    BpfRoutingModule,
    ReactiveFormsModule,
    NgbAccordionModule,
  ],
  declarations: [
    BpfComponent,
    BpfBasicComponent,
    TestSegmentsComponent,
    BpfGraphicComponent,
  ],
})
export class BpfModule {}
