import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../../layouts/layouts.module';
import { ActionSidebarComponent } from './action-sidebar/action-sidebar.component';
import { BpfModule } from './bpf/bpf.module';
import { SettingsRoutingModule } from './settings-routing.modul';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule, LayoutsModule, SettingsRoutingModule, BpfModule],
  declarations: [SettingsComponent, ActionSidebarComponent],
})
export class SettingsModule {}
