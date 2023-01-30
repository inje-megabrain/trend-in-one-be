import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { UserCreateCommand } from '@app/user/user-account/user.commands';
import { UserAuthType, UserRole } from '@domain/user/user';

export class UserCreateRequest implements UserCreateCommand {
  @ApiProperty({ description: '유저명', example: 'test' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '이메일', example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '비밀번호', example: '123456' })
  @IsString()
  @IsOptional()
  @Length(5)
  password?: string;

  @ApiProperty({ description: '권한', example: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'Auth 타입', example: UserAuthType.KAKAO })
  @IsEnum(UserAuthType)
  @IsNotEmpty()
  authType: UserAuthType;
}
