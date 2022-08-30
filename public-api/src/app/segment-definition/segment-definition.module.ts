import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SegmentDefinitionSchema } from '../models/database.model';
import { SegmentDefinitionController } from './segment-definition.controller';
import { SegmentDefinitionService } from './services/segment-definition.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'segment-definitions', schema: SegmentDefinitionSchema },
    ]),
  ],
  controllers: [SegmentDefinitionController],
  providers: [SegmentDefinitionService],
})
export class SegmentDefinitionModule {}
