import { Module } from '@nestjs/common';

import { TopicController } from '@app/topic/topic.controller';
import { TopicService } from '@app/topic/topic.service';

@Module({
  providers: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
