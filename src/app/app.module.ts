import { Module } from '@nestjs/common';

import { CrawlerModule } from './crawler/crawler.module';

import { PostModule } from '@app/post/post.module';

@Module({
  imports: [PostModule, CrawlerModule],
})
export class AppModule {}
