import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnalyseCompaniesModule } from './analyse-companies/analyse-companies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OptimalInvestmentEquationModule } from './breach-probability/optimal-investment-equation.module';
import { BusinessProfileModule } from './business-profile/business-profile.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { SegmentDefinitionModule } from './segment-definition/segment-definition.module';
import { SegmentModule } from './segment/segment.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SegmentModule,
    MongooseModule.forRoot(`mongodb://root:aWEsomeDatabase@mongodb:27017`, {
      dbName: 'sec-advisor',
    }),
    BusinessProfileModule,
    SegmentDefinitionModule,
    OptimalInvestmentEquationModule,
    RecommendationModule,
    UsersModule,
    AuthModule,
    SettingsModule,
    AnalyseCompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
