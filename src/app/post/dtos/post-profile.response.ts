import { ApiProperty } from '@nestjs/swagger';

import { CommunityTitle, PostProperties } from '../../../domain/post/post';

export class PostProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private title!: string;
  @ApiProperty() private author!: string;
  @ApiProperty() private views!: number | null;
  @ApiProperty() private likes!: number | null;
  @ApiProperty() private hasImage!: boolean | null;
  @ApiProperty() private postUrl!: string;
  @ApiProperty() private uploadedAt!: Date;
  @ApiProperty() private createdAt!: Date;
  @ApiProperty() private updatedAt!: Date;
  @ApiProperty() private communityTitle!: CommunityTitle;

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
  }
}
