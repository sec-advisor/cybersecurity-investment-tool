import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutsModule } from '../layouts/layouts.module';
import { HomeComponent } from './home.component';
import { HomeService } from './services/home.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
