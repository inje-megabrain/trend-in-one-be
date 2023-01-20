import { ApiProperty } from '@nestjs/swagger';
export class KakaoAuthResponse {
  @ApiProperty({
    description: '카카오 REST API 호스트',
  })
  host: string;

  @ApiProperty({
    description: '카카오 REST API 키',
  })
  restApiKey: string;

  @ApiProperty({
    description: '카카오 로그인 후 리다이렉트 되는 URI',
  })
  redirectUri: string;

  constructor(data: { host: string; restApiKey: string; redirectUri: string }) {
    this.host = data.host;
    this.restApiKey = data.restApiKey;
    this.redirectUri = data.redirectUri;
  }
}
