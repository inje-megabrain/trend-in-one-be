import { ApiProperty } from '@nestjs/swagger';

import { TopicProperties } from '@domain/topic/topic';

export class TopicProfileResponse
  implements Pick<TopicProperties, 'name' | 'query' | 'tweet_volume' | 'url'>
{
  @ApiProperty({ description: '주제명' })
  name: string;

  @ApiProperty({ description: '주제 쿼리' })
  query: string;

  @ApiProperty({ description: '트윗 수' })
  tweet_volume: number | null;

  @ApiProperty({ description: '주제 URL' })
  url: string;
  constructor(
    topic: Pick<TopicProperties, 'name' | 'query' | 'tweet_volume' | 'url'>,
  ) {
    this.name = topic.name;
    this.query = topic.query;
    this.tweet_volume = topic.tweet_volume;
    this.url = topic.url;
  }
}
