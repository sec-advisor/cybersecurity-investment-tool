import { Module } from '@nestjs/common';

import { BusinessProfileController } from './business-profile.controller';

@Module({
  controllers: [BusinessProfileController]
})
export class BusinessProfileModule { }
