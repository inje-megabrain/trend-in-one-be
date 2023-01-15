import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentsController } from '@app/contents/contents.controller';
import { ContentsService } from '@app/contents/contents.service';
import { PostModule } from '@app/contents/post/post.module';
import { TopicModule } from '@app/contents/topic/topic.module';
import { VideoModule } from '@app/contents/video/video.module';
import { CrawlerModule } from '@app/crawler/crawler.module';
import { Community } from '@domain/post/community.entity';
import { Post } from '@domain/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';
import { Video } from '@domain/video/video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Topic, Video, Community]),
    PostModule,
    CrawlerModule,
    TopicModule,
    VideoModule,
  ],
  providers: [ContentsService],
  controllers: [ContentsController],
})
export class ContentsModule {}
