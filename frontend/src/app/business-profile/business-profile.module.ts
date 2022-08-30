import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutsModule } from '../layouts/layouts.module';
import { BusinessProfileComponent } from './business-profile.component';

@NgModule({
  imports: [CommonModule, LayoutsModule, ReactiveFormsModule],
  declarations: [BusinessProfileComponent],
})
export class BusinessProfileModule {}
