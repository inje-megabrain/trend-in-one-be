import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicController } from '@app/contents/topic/topic.controller';
import { TopicService } from '@app/contents/topic/topic.service';
import { Community } from '@domain/post/community.entity';
import { Topic } from '@domain/topic/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Community])],
  providers: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
