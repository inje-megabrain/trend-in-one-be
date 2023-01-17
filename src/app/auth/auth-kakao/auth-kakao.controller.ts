import { Controller, Get } from '@nestjs/common';

@Controller('auth/kakao')
export class AuthKakaoController {
  @Get('login')
  async login() {
    //TODO: 클라이언트의 로그인 접근 API
  }

  @Get('login/redirect')
  async loginRedirect() {
    //TODO: Kakao Auth 서버에서 code를 담아 리다이렉션 해줄 Callback URL
  }
}
