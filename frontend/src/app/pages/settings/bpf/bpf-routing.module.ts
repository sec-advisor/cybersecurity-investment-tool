import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BpfComponent } from './bpf.component';

const routes: Routes = [
  { path: '', component: BpfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BpfRoutingModule { }
