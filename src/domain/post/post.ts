import { Community } from './community.entity';

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
};

export enum CommunityTitle {
  REDDIT = 'REDDIT',
  DC_INSIDE = 'DC_INSIDE',
  TWITTER = 'TWITTER',
}

export type CommunityProperties = {
  id: string;
  title: CommunityTitle;
};
