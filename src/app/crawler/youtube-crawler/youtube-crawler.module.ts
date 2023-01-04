import { Module } from '@nestjs/common';

import { YoutubeCrawlerController } from '@app/crawler/youtube-crawler/youtube-crawler.controller';
import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';

@Module({
  controllers: [YoutubeCrawlerController],
  providers: [YoutubeCrawlerService],
})
export class YoutubeCrawlerModule {}
