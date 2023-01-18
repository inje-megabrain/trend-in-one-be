import {
  Controller,
  Get,
  Logger,
  Render,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@app/auth/auth-kakao/decorator/user.decorator';
import { SessionAuthGuard } from '@app/auth/auth-kakao/guard/session.auth.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  private readonly logger = new Logger(AuthKakaoController.name);
  constructor(private readonly configService: ConfigService) {}

  @Get('login')
  login(@Session() session: Record<string, any>) {
    this.logger.debug({ session });
    return {
      data: {
        host: this.configService.get<string>('KAKAO_REST_API_HOST'),
        restApiKey: this.configService.get<string>('KAKAO_REST_API_KEY'),
        redirectUri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
      },
    };
  }

  @Get('login/redirect')
  @UseGuards(AuthGuard('kakao'))
  async loginRedirect(
    @User() user,
    @Session() session: Record<string, any>,
    @Res() res,
  ): Promise<void> {
    this.logger.debug({ session });
    const {
      profile: { provider, id },
      token: { accessToken },
    } = user;

    session.provider = provider;
    session.userId = id;
    session.accessToken = accessToken;

    res.redirect('protected');
  }

  @Get('protected')
  @UseGuards(SessionAuthGuard)
  @Render('protected')
  protected(@Session() session: Record<string, any>) {
    this.logger.debug({ session });
    const { provider, userId, accessToken } = session;
    return {
      data: {
        provider,
        userId,
        accessToken,
      },
    };
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>, @Res() res) {
    session.destroy();
    res.redirect('login');
  }
}
