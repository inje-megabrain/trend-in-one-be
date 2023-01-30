import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserUpdateCommand } from '@app/user/user-account/user.commands';
import { UserRole, UserAuthType } from '@domain/user/user';

export class UserUpdateRequest implements UserUpdateCommand {
  @ApiProperty({ description: '유저명', example: 'test' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '이메일', example: 'test@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '권한', example: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'Auth 타입', example: UserAuthType })
  @IsEnum(UserAuthType)
  @IsNotEmpty()
  authType: UserAuthType;
}
