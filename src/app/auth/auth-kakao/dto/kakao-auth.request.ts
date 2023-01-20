import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class KakaoAuthRequest {
  @ApiProperty({ description: '카카오 로그인 요청 코드' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ description: '카카오 로그인 요청 도메인' })
  @IsString()
  @IsNotEmpty()
  domain!: string;
}
