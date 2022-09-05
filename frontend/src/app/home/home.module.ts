import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LayoutsModule } from '../layouts/layouts.module';
import { HomeComponent } from './home.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { HomeService } from './services/home.service';

@NgModule({
  imports: [CommonModule, LayoutsModule, ReactiveFormsModule],
  declarations: [HomeComponent, LoginModalComponent],
  providers: [HomeService, NgbActiveModal],
})
export class HomeModule { }
