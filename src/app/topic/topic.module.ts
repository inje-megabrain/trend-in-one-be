import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TopicController } from '@app/topic/topic.controller';
import { TopicService } from '@app/topic/topic.service';

@Module({
  imports: [
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
  providers: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
