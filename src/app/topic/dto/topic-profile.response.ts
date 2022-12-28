import { TopicProperties } from '@domain/topic/topic';

export class TopicProfileResponse
  implements Pick<TopicProperties, 'name' | 'query' | 'tweet_volume' | 'url'>
{
  name: string;
  query: string;
  tweet_volume: number | null;
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
