import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BusinessProfileSchema } from '../models/database.model';
import { BusinessProfileController } from './business-profile.controller';
import { BusinessProfileService } from './services/business-profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'business-profile', schema: BusinessProfileSchema }])
  ],
  controllers: [BusinessProfileController],
  providers: [BusinessProfileService]
})
export class BusinessProfileModule { }
