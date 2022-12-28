import { TopicProperties } from '@domain/topic/topic';

export class TopicProfileResponse
  implements
    Pick<TopicProperties, 'id' | 'name' | 'query' | 'tweet_volume' | 'url'>
{
  id: string;
  name: string;
  query: string;
  tweet_volume: number | null;
  url: string;
  constructor(
    topic: Pick<
      TopicProperties,
      'id' | 'name' | 'query' | 'tweet_volume' | 'url'
    >,
  ) {
    this.id = topic.id;
    this.name = topic.name;
    this.query = topic.query;
    this.tweet_volume = topic.tweet_volume;
    this.url = topic.url;
  }
}
