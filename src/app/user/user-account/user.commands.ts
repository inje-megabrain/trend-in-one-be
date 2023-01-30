import { UserProperties } from '@domain/user/user';

export type UserProfile = Pick<
  UserProperties,
  'username' | 'email' | 'role' | 'authType'
>;

export type UserCreateCommand = Pick<
  UserProperties,
  'username' | 'email' | 'authType'
> &
  Partial<Pick<UserProperties, 'password' | 'role'>>;

export type UserUpdateCommand = Partial<UserCreateCommand>;

export type UserPasswordUpdateCommand = Pick<UserProperties, 'password'>;
