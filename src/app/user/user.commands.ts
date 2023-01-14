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
