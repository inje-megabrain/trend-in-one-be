import { ApiProperty } from '@nestjs/swagger';

import { ContentsType } from '@app/contents/video/contents.command';
import { CommunityTitle } from '@domain/post/post';
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

  @ApiProperty({
    description: '커뮤니티 제목',
    type: String,
    enum: CommunityTitle,
    example: CommunityTitle.TWITTER,
  })
  communityTitle: CommunityTitle;

  @ApiProperty({
    description: '콘텐츠 타입에 대한 설명입니다.',
    type: String,
    enum: ContentsType,
    example: ContentsType.TOPIC,
  })
  contentsType: ContentsType;

  constructor(
    topic: Pick<
      TopicProperties,
      | 'name'
      | 'query'
      | 'tweetVolume'
      | 'url'
      | 'ContentsType'
      | 'communityTitle'
    >,
  ) {
    this.name = topic.name;
    this.query = topic.query;
    this.tweetVolume = topic.tweetVolume;
    this.url = topic.url;
    this.communityTitle = topic.communityTitle;
    this.contentsType = ContentsType.TOPIC;
  }
}
