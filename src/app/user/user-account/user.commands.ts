import { PostProperties } from '@domain/post/post';
import { UserProperties } from '@domain/user/user';

export type UserProfile = Pick<
  UserProperties,
  'username' | 'email' | 'role' | 'oAuthType'
>;

export type UserCreateCommand = Pick<
  UserProperties,
  'username' | 'email' | 'password'
> &
  Partial<Pick<UserProperties, 'role' | 'oAuthType'>>;

export type UserUpdateCommand = Partial<UserCreateCommand>;

export type UserPasswordUpdateCommand = Pick<UserProperties, 'password'>;

export type UserBookmarkCommand = {
  id: string;
  user: UserProperties;
  post: PostProperties;
  updatedAt: Date;
};
