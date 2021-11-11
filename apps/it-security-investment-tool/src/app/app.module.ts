import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessProfileModule } from './business-profile/business-profile.module';
import { HomeModule } from './home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { SegmentPresenterModule } from './segment-presenter/segment-presenter.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    AppRoutingModule,
    SegmentPresenterModule,
    HomeModule,
    BusinessProfileModule,
    LayoutsModule,
    RecommendationModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
