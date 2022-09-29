import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDECH from '@angular/common/locales/de-CH';
import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { BusinessProfileModule } from './pages/business-profile/business-profile.module';
import { HomeModule } from './pages/home/home.module';
import { RecommendationModule } from './pages/recommendation/recommendation.module';
import { SegmentPresenterModule } from './pages/segment-presenter/segment-presenter.module';
import { SettingsModule } from './pages/settings/settings.module';
import { CustomReuseStrategy } from './routing';
import { BackendUrlResolverService } from './services/backend-url-resolver.service';

registerLocaleData(localeDECH);

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
    SettingsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => (): Promise<void> =>
        injector.get(BackendUrlResolverService).init(),
      multi: true,
      deps: [Injector],
    },
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
