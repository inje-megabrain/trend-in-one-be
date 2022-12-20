import { Module } from '@nestjs/common';

import { RedditCrawlerController } from './reddit-crawler.controller';
import { RedditCrawlerService } from './reddit-crawler.service';

@Module({
  controllers: [RedditCrawlerController],
  providers: [RedditCrawlerService],
})
export class RedditCrawlerModule {}
