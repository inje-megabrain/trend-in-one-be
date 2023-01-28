import { PostProperties } from '@domain/post/post';
import { UserProperties } from '@domain/user/user';

export type UserBookmarkCommand = {
  id: string;
  user: UserProperties;
  post: PostProperties;
  updatedAt: Date;
};
