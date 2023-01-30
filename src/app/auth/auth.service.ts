import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserRequestCommand } from '@app/auth/commands/kakao.command';
import { KakaoAuthUserResponse } from '@app/auth/dto/kakao-auth-user.response';
import { TokenResponse } from '@app/auth/dto/token.response';
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '@app/constants';
import { UserAccountService } from '@app/user/user-account/user-account.service';
import { UserAuthType } from '@domain/user/user';
import { JwtSubjectType } from '@infrastructure/types/jwt.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userAccountService: UserAccountService,
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

  async login(
    username: string,
    authType: UserAuthType,
  ): Promise<TokenResponse> {
    const user = await this.userAccountService.findByUsername(
      username,
      {},
      {},
      { authType },
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);
    return { accessToken, refreshToken };
  }

  protected async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        expiresIn: ACCESS_TOKEN_EXPIRE,
        subject: JwtSubjectType.ACCESS,
      },
    );
  }

  protected async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        expiresIn: REFRESH_TOKEN_EXPIRE,
        subject: JwtSubjectType.REFRESH,
      },
    );
  }
}
