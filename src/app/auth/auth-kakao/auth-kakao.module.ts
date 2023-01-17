import { Module } from '@nestjs/common';

import { AuthKakaoController } from '@app/auth/auth-kakao/auth-kakao.controller';
import { AuthKakaoService } from '@app/auth/auth-kakao/auth-kakao.service';

@Module({
  imports: [],
  providers: [AuthKakaoService],
  controllers: [AuthKakaoController],
})
export class AuthKakaoModule {}
