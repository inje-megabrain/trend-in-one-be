import { ApiProperty } from '@nestjs/swagger';

export class KakaoAuthResponse {
  @ApiProperty({
    description: '토큰 받기 요청에 필요한 인가 코드',
  })
  code?: string;
  @ApiProperty({
    description: '요청 시 전달한 state 값과 동일한 값',
  })
  state?: string;

  @ApiProperty({
    description: '인증 실패 시 반환되는 에러 코드',
  })
  error?: string;
  @ApiProperty({
    description: '인증 실패 시 반환되는 에러 메시지',
  })
  error_description?: string;
}
