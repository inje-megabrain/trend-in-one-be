import { CommunityTitle } from '@domain/post/post';

export type PostListQuery = {
  page: number;
  limit: number;
};

export type PostByCommunityListQuery = {
  communityTitle: CommunityTitle;
} & PostListQuery;
