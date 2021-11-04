import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessProfileModule } from './business-profile/business-profile.module';
import { SegmentModule } from './segment/segment.module';

@Module({
  imports: [
    SegmentModule,
    MongooseModule.forRoot('mongodb+srv://investor:uYqBIlR3aT1dYpNo@cluster0.4ehbr.mongodb.net/investment-calculator?retryWrites=true&w=majority'),
    BusinessProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
