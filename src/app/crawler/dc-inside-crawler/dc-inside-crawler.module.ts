import { Module } from '@nestjs/common';

import { DcInsideCrawlerController } from './dc-inside-crawler.controller';

@Module({
  controllers: [DcInsideCrawlerController],
})
export class DcInsideCrawlerModule {}
