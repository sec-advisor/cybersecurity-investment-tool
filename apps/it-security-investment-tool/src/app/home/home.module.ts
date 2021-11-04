import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../layouts/layouts.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
