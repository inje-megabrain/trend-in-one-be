import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DcInsideCrawlerController } from './dc-inside-crawler.controller';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';
import { DcInsideClient } from '@app/crawler/dc-inside-crawler/utils/dc-inside.client';
import { Community } from '@domain/post/community.entity';
import { Post } from '@domain/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Community])],
  controllers: [DcInsideCrawlerController],
  providers: [
    DcInsideCrawlerService,
    { provide: 'DcInsideClient', useClass: DcInsideClient },
  ],
  exports: [DcInsideCrawlerService],
})
export class DcInsideCrawlerModule {}
