import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedditCrawlerController } from './reddit-crawler.controller';
import { RedditCrawlerService } from './reddit-crawler.service';

import { Community } from '@domain/post/community.entity';
import { Post } from '@domain/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Community]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //TODO: baseURL 부분의 서브도메인 변경 코드를 어떻게 작성할지 고민해보기
      useFactory: () => ({
        baseURL: '', //https://www.reddit.com
        validateStatus: () => true,
      }),
    }),
  ],
  controllers: [RedditCrawlerController],
  providers: [RedditCrawlerService],
  exports: [RedditCrawlerService],
})
export class RedditCrawlerModule {}
