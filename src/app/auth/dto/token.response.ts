import { loginResponse } from '@app/auth/commands/login.response';

export class TokenResponse {
  accessToken: string;
  refreshToken: string;

  constructor(tokens: loginResponse) {
    Object.assign(this, tokens);
  }
}
