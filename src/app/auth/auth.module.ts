import { Module } from '@nestjs/common';

import { AuthKakaoModule } from '@app/auth/auth-kakao/auth-kakao.module';

@Module({
  imports: [AuthKakaoModule],
})
export class AuthModule {}
