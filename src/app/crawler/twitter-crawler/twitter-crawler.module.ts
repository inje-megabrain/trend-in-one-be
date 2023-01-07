import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TwitterCrawlerController } from '@app/crawler/twitter-crawler/twitter-crawler.controller';
import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';
import { Community } from '@domain/post/community.entity';
import { Topic } from '@domain/topic/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, Community]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        baseURL: 'https://api.twitter.com/1.1',
        headers: {
          Authorization: `Bearer ` + process.env.TWITTER_BEARER_TOKEN,
        },
        validateStatus: () => true,
      }),
    }),
  ],
  controllers: [TwitterCrawlerController],
  providers: [TwitterCrawlerService],
  exports: [TwitterCrawlerService],
})
export class TwitterCrawlerModule {}
