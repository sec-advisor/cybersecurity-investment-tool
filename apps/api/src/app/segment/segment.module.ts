import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SegmentDefinitionSchema } from '../models/database.model';
import { SegmentController } from './segment.controller';
import { SegmentService } from './services/segment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'segment-definitions', schema: SegmentDefinitionSchema }])
  ],
  controllers: [SegmentController],
  providers: [SegmentService]
})
export class SegmentModule { }
