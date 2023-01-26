import { PostProperties } from '@domain/post/post';

export type UserProperties = {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  oAuthType: OAuthType | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum OAuthType {
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
}

export type UserBookmarkProperties = {
  id: string;
  user: UserProperties;
  post: PostProperties;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
