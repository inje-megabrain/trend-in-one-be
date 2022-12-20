import { Module } from '@nestjs/common';

import { RedditCrawlerModule } from './reddit-crawler/reddit-crawler.module';

@Module({
  imports: [RedditCrawlerModule],
})
export class CrawlerModule {}
