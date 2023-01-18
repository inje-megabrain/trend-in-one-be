import { Module } from '@nestjs/common';

import { AuthKakaoController } from '@app/auth/auth-kakao/auth-kakao.controller';

@Module({
  imports: [],
  controllers: [AuthKakaoController],
})
export class AuthKakaoModule {}
