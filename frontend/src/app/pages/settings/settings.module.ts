import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../../layouts/layouts.module';
import { BpfModule } from './bpf/bpf.module';
import { SettingsRoutingModule } from './settings-routing.modul';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule, LayoutsModule, SettingsRoutingModule, BpfModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
