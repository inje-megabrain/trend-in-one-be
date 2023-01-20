import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Logger,
  Post,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { KakaoAuthRequest } from '@app/auth/auth-kakao/dto/kakao-auth.request';
import { KakaoAuthResponse } from '@app/auth/auth-kakao/dto/kakao-auth.response';

@Controller('auth/kakao')
@ApiTags('[인증] 카카오 로그인')
export class AuthKakaoController {
  private readonly logger = new Logger(AuthKakaoController.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 정보 획득' })
  @ApiOkResponse({ type: KakaoAuthResponse })
  @ApiBody({ type: KakaoAuthRequest })
  async login(@Body() data: KakaoAuthRequest, @Response() res): Promise<any> {
    const tokenData = {
      grant_type: 'authorization_code',
      client_id: this.configService.get('KAKAO_CLIENT_ID'),
      redirect_uri: this.configService.get('KAKAO_REDIRECT_URI'),
      code: data.code,
    };
    try {
      const { data, status } = await this.httpService.axiosRef.request({
        method: 'POST',
        url: `/oauth/token`,
        params: tokenData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        timeout: 30000,
      });
      if (status !== 200) {
        throw new UnauthorizedException('잘못된 토큰입니다.');
      }
      const headerUserInfo = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${data.access_token}`,
      };
      const { data: kakaoUserInfo } = await this.httpService.axiosRef.request({
        method: 'GET',
        url: `/v2/user/me`,
        headers: headerUserInfo,
        timeout: 30000,
      });
      return new KakaoAuthResponse(kakaoUserInfo);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
