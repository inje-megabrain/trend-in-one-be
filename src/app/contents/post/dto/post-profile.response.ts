import { ApiProperty } from '@nestjs/swagger';

import { ContentsType } from '@app/contents/video/contents.command';
import { CommunityTitle, PostProperties } from '@domain/post/post';

export class PostProfileResponse {
  @ApiProperty({
    description: '게시글 고유 식별자(uuid v4)',
    example: '386be2fa-0c21-43be-a35a-05c4cb995ae1',
  })
  id!: string;

  @ApiProperty({ description: '게시글 제목', example: '게시글 제목' })
  title!: string;

  @ApiProperty({
    description: '게시글 작성자 닉네임',
    example: '작성자 닉네임',
  })
  author!: string;

  @ApiProperty({
    description: '게시글 조회수',
    example: 123456,
    nullable: true,
    type: Number,
  })
  views!: number | null;

  @ApiProperty({
    description: '게시글 좋아요 수',
    example: 123456,
    nullable: true,
    type: Number,
  })
  likes!: number | null;

  @ApiProperty({
    description: '게시글에 이미지가 포함되어 있는지 여부',
    example: true,
    type: Boolean,
  })
  hasImage!: boolean | null;

  @ApiProperty({
    description: '게시글 주소',
    example: 'https://www.reddit.com/r/funny/comments/zqfzfc/no_way/',
    type: String,
  })
  postUrl!: string;

  @ApiProperty({
    description: '게시글이 업로드된 날짜',
    example: '2021-01-01T00:00:00.000Z',
    type: Date,
  })
  uploadedAt!: Date;

  @ApiProperty({
    description: '게시글이 속한 커뮤니티 명',
    example: CommunityTitle.REDDIT,
    enum: CommunityTitle,
    type: String,
  })
  communityTitle!: CommunityTitle;

  @ApiProperty({
    description: '콘텐츠 타입에 대한 설명입니다.',
    type: String,
    enum: ContentsType,
    example: ContentsType.POST,
  })
  contentsType: ContentsType;

  constructor(post: PostProperties) {
    this.id = post.id;
    this.title = post.title;
    this.author = post.author;
    this.views = post.views;
    this.likes = post.likes;
    this.hasImage = post.hasImage;
    this.postUrl = post.postUrl;
    this.uploadedAt = post.uploadedAt;
    this.communityTitle = post.community.title;
    this.contentsType = ContentsType.POST;
  }
}
