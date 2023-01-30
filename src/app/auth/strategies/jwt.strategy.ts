import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserAccountService } from '@app/user/user-account/user-account.service';
import { NeedAuthenticationException } from '@domain/errors/auth.errors';
import { User } from '@domain/user/user.entity';
import {
  JwtDecodedData,
  JwtSubjectType,
} from '@infrastructure/types/jwt.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userAccountService: UserAccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('APP_SECRET', ''),
      ignoreExpiration: false,
    });
  }

  async validate(data: JwtDecodedData): Promise<User> {
    if (data.sub !== JwtSubjectType.ACCESS) {
      throw new NeedAuthenticationException();
    }

    return this.userAccountService.findById(data.user_id);
  }
}
