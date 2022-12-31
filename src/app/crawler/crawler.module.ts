import { Module } from '@nestjs/common';

import { DcInsideCrawlerModule } from './dc-inside-crawler/dc-inside-crawler.module';
import { RedditCrawlerModule } from './reddit-crawler/reddit-crawler.module';
import { TwitterCrawlerModule } from './twitter-crawler/twitter-crawler.module';

@Module({
  imports: [RedditCrawlerModule, DcInsideCrawlerModule, TwitterCrawlerModule],
})
export class CrawlerModule {}
