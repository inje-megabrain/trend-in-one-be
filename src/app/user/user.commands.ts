import { UserProperties } from '@domain/user/user';

export type UserProfile = Pick<
  UserProperties,
  'username' | 'email' | 'role' | 'oAuthType'
>;

export type UserCreateCommand = Pick<
  UserProperties,
  'username' | 'email' | 'password' | 'role' | 'oAuthType'
>;

export type UserUpdateCommand = Partial<UserCreateCommand>;
