import { Community } from './community.entity';

import { ContentsType } from '@app/contents/video/contents.command';

export type PostProperties = {
  id: string;
  title: string;
  author: string;
  views: number | null;
  likes: number | null;
  hasImage: boolean | null;
  postUrl: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  community: Community;
  communityId?: string;
  communityTitle?: CommunityTitle;
  contentsType?: ContentsType;
};

export enum CommunityTitle {
  REDDIT = 'REDDIT',
  DC_INSIDE = 'DC_INSIDE',
  TWITTER = 'TWITTER',
  YOUTUBE = 'YOUTUBE',
}

export type CommunityProperties = {
  id: string;
  title: CommunityTitle;
};
