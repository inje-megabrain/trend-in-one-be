import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserProfile } from '@app/user/user-account/user.commands';
import { UserAuthType, UserRole } from '@domain/user/user';

export class UserProfileResponse implements UserProfile {
  @ApiProperty({ description: '유저명', example: 'test' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '이메일', example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '권한', example: UserRole.USER })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ description: 'OAuth 타입', example: UserAuthType.KAKAO })
  @IsEnum(UserAuthType)
  @IsNotEmpty()
  authType: UserAuthType;

  constructor(user: UserProfile) {
    Object.assign(this, user);
  }
}
