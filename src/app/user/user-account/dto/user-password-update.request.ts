import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { UserPasswordUpdateCommand } from '@app/user/user-account/user.commands';

export class UserPasswordUpdateRequest implements UserPasswordUpdateCommand {
  @ApiProperty({ description: '비밀번호', example: '123456' })
  @IsString()
  @IsNotEmpty()
  @Length(5)
  password!: string;
}
