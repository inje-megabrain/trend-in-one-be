import { Module } from '@nestjs/common';

import { TwitterCrawlerController } from '@app/crawler/twitter-crawler/twitter-crawler.controller';
import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';

@Module({
  controllers: [TwitterCrawlerController],
  providers: [TwitterCrawlerService],
})
export class TwitterCrawlerModule {}
