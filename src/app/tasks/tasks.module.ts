import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';

import { DcInsideCrawlerModule } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.module';
import { RedditCrawlerModule } from '@app/crawler/reddit-crawler/reddit-crawler.module';
import { TwitterCrawlerModule } from '@app/crawler/twitter-crawler/twitter-crawler.module';
import { YoutubeCrawlerModule } from '@app/crawler/youtube-crawler/youtube-crawler.module';
import { TaskFactory } from '@app/tasks/utils/task-factory.utils';
import { Community } from '@domain/post/community.entity';
import { Task } from '@domain/task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, Task]),
    RedditCrawlerModule,
    DcInsideCrawlerModule,
    YoutubeCrawlerModule,
    TwitterCrawlerModule,
  ],
  providers: [TasksService, TaskFactory],
  exports: [TasksService],
})
export class TasksModule {}
