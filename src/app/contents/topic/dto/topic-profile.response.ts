import { ApiProperty } from '@nestjs/swagger';

import { TopicProperties } from '@domain/topic/topic';

export class TopicProfileResponse
  implements Pick<TopicProperties, 'name' | 'query' | 'tweetVolume' | 'url'>
{
  @ApiProperty({ description: '주제명' })
  name: string;

  @ApiProperty({ description: '주제 쿼리' })
  query: string;

  @ApiProperty({ description: '트윗 수' })
  tweetVolume: number | null;

  @ApiProperty({ description: '주제 URL' })
  url: string;
  constructor(
    topic: Pick<TopicProperties, 'name' | 'query' | 'tweetVolume' | 'url'>,
  ) {
    this.name = topic.name;
    this.query = topic.query;
    this.tweetVolume = topic.tweetVolume;
    this.url = topic.url;
  }
}
