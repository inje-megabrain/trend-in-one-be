import { ContentsType } from '@app/contents/contents.command';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';

export type TopicProperties = {
  id: string;
  name: string;
  url: string;
  promotedContent: string | null;
  query: string;
  tweetVolume: number | null;
  woeid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  community: Community;
  communityId?: string;
  communityTitle?: CommunityTitle;
  ContentsType?: ContentsType;
};
