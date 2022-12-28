import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';

export type TopicProperties = {
  id: string;
  name: string;
  url: string;
  promoted_content: string | null;
  query: string;
  tweet_volume: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  community: Community;
  communityId?: string;
  communityTitle?: CommunityTitle;
};
