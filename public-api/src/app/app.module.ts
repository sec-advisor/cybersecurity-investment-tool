import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptimalInvestmentEquationModule } from './breach-probability/optimal-investment-equation.module';
import { BusinessProfileModule } from './business-profile/business-profile.module';
import { SegmentDefinitionModule } from './segment-definition/segment-definition.module';
import { SegmentModule } from './segment/segment.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SegmentModule,
    MongooseModule.forRoot(
      'mongodb+srv://investor:uYqBIlR3aT1dYpNo@cluster0.4ehbr.mongodb.net/investment-calculator?retryWrites=true&w=majority',
    ),
    BusinessProfileModule,
    SegmentDefinitionModule,
    OptimalInvestmentEquationModule,
    RecommendationModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
