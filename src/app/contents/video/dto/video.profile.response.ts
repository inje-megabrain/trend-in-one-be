import { ApiProperty } from '@nestjs/swagger';

import { ContentsType } from '@app/contents/video/contents.command';
import { VideoProfileResponseProperties } from '@app/contents/video/video.comand';
import { CommunityTitle } from '@domain/post/post';

export class VideoProfileResponse implements VideoProfileResponseProperties {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: '영상 ID' })
  videoId: string;

  @ApiProperty({ description: '영상 URL' })
  videoUrl: string;

  @ApiProperty({ description: '영상 제목' })
  title: string;

  @ApiProperty({ description: '영상 설명' })
  description: string;

  @ApiProperty({ description: '썸네일 URL' })
  thumbnailUri: string;

  @ApiProperty({ description: '채널 ID' })
  channelId: string;

  @ApiProperty({ description: '채널 제목' })
  channelTitle: string;

  @ApiProperty({
    description: '커뮤니티 제목',
    type: String,
    enum: CommunityTitle,
    example: CommunityTitle.YOUTUBE,
  })
  communityTitle: CommunityTitle;

  @ApiProperty({
    description: '콘텐츠 타입에 대한 설명입니다.',
    type: String,
    enum: ContentsType,
    example: ContentsType.VIDEO,
  })
  contentsType: ContentsType;

  @ApiProperty({ description: '업로드 날짜' })
  uploadedAt: Date;

  constructor(video: VideoProfileResponseProperties) {
    this.id = video.id;
    this.videoId = video.videoId;
    this.videoUrl = 'https://youtu.be/' + video.videoId;
    this.title = video.title;
    this.description = video.description;
    this.thumbnailUri = video.thumbnailUri;
    this.channelId = video.channelId;
    this.channelTitle = video.title;
    this.communityTitle = video.communityTitle;
    this.contentsType = ContentsType.VIDEO;
    this.uploadedAt = video.uploadedAt;
  }
}
