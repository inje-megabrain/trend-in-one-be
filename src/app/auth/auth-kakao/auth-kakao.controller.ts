import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthKakaoService } from '@app/auth/auth-kakao/auth-kakao.service';
import { KakaoAuthUserResponse } from '@app/auth/auth-kakao/dto/kakao-auth-user.response';
import { KakaoAuthRequest } from '@app/auth/auth-kakao/dto/kakao-auth.request';

@Controller('auth/kakao')
@ApiTags('[인증] 카카오 로그인')
export class AuthKakaoController {
  private readonly logger = new Logger(AuthKakaoController.name);
  constructor(private readonly authKakaoService: AuthKakaoService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 정보 획득' })
  @ApiOkResponse({ type: KakaoAuthUserResponse })
  @ApiBody({ type: KakaoAuthRequest })
  async login(
    @Body() accountRequestInfo: KakaoAuthRequest,
  ): Promise<KakaoAuthUserResponse> {
    try {
      // 카카오 토큰 조회 후 계정 정보 가져오기
      const { code, domain } = accountRequestInfo;
      if (!code || !domain) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      const kakao = await this.authKakaoService.kakaoLogin({ code, domain });

      if (!kakao.id) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }

      return kakao;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
