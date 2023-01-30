import { UserAuthType } from '@domain/user/user';

export type LoginRequest = {
  username: string;
  password: string;
};
export type KakaoLoginRequest = {
  authType: UserAuthType.KAKAO;
  userId: string;
};
