import { Module } from '@nestjs/common';

import { CrawlerModule } from '@app/crawler/crawler.module';
import { PostModule } from '@app/post/post.module';
import { TopicModule } from '@app/topic/topic.module';

@Module({
  imports: [PostModule, CrawlerModule, TopicModule],
})
export class AppModule {}
