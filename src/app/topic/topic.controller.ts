import { Controller, Get } from '@nestjs/common';

import { TopicProfileResponse } from '@app/topic/dto/topic-profile.response';

@Controller('topics')
export class TopicController {
  @Get()
  async getTopics(): Promise<TopicProfileResponse[]> {
    const topics = [
      {
        id: 'string',
        name: 'string',
        query: 'string',
        tweet_volume: 1,
        url: 'string',
      },
      {
        id: 'string',
        name: 'string',
        query: 'string',
        tweet_volume: 1,
        url: 'string',
      },
    ];
    return topics.map((topic) => new TopicProfileResponse(topic));
  }
}
