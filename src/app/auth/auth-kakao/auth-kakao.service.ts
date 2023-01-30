import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KakaoAuthUserResponse } from '@app/auth/auth-kakao/dto/kakao-auth-user.response';
import { UserRequestCommand } from '@app/auth/auth-kakao/kakao.command';

@Injectable()
export class AuthKakaoService {
  private readonly logger = new Logger(AuthKakaoService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async kakaoLogin(data: UserRequestCommand): Promise<KakaoAuthUserResponse> {
    const { code, domain } = data;
    if (!code) {
      throw new UnauthorizedException('카카오 정보가 없습니다.');
    }
    if (!domain) {
      throw new UnauthorizedException('도메인 정보가 없습니다.');
    }
    const body = {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
      redirect_uri: domain,
      code,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const { data: kakaoAuthData, status: kakaoAuthStatus } =
        await this.httpService.axiosRef.request({
          method: 'POST',
          url: `https://kauth.kakao.com/oauth/token`,
          timeout: 30000,
          headers,
          data: body,
        });

      if (kakaoAuthStatus === 200) {
        // Token 을 가져왔을 경우 사용자 정보 조회
        const headerUserInfo = {
          Authorization: 'Bearer ' + kakaoAuthData.access_token,
        };

        const responseUserInfo = await this.httpService.axiosRef.request({
          method: 'GET',
          url: `https://kapi.kakao.com/v2/user/me`,
          timeout: 30000,
          headers: headerUserInfo,
        });
        if (responseUserInfo.status === 200) {
          return new KakaoAuthUserResponse(responseUserInfo.data);
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
