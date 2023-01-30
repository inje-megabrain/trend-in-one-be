import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthKakaoController } from '@app/auth/auth-kakao/auth-kakao.controller';
import { AuthKakaoService } from '@app/auth/auth-kakao/auth-kakao.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        validateStatus: () => true,
      }),
    }),
  ],
  controllers: [AuthKakaoController],
  providers: [AuthKakaoService],
})
export class AuthKakaoModule {}
