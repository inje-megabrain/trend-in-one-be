import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { TasksModule } from './tasks/tasks.module';

import { CrawlerModule } from '@app/crawler/crawler.module';
import { PostModule } from '@app/post/post.module';
import { TopicModule } from '@app/topic/topic.module';
import { VideoModule } from '@app/video/video.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostModule,
    CrawlerModule,
    TopicModule,
    VideoModule,
    TasksModule,
  ],
})
export class AppModule {}
