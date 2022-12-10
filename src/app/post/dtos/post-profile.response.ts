import { ApiProperty } from '@nestjs/swagger';

import { PostProperties } from '../../../domain/post/post';

export class PostProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private title!: string;
  @ApiProperty() private author!: string;
  @ApiProperty() private views!: number;
  @ApiProperty() private redirectUrl!: string;
  @ApiProperty() private uploadedAt!: Date;
  @ApiProperty() private createdAt!: Date;
  @ApiProperty() private updatedAt!: Date;
  @ApiProperty({ nullable: true }) private deletedAt!: Date | null;

  constructor(post: PostProperties) {
    this.id = post.id;
    this.title = post.title;
    this.author = post.author;
    this.views = post.views;
    this.redirectUrl = post.redirectUrl;
    this.uploadedAt = post.uploadedAt;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.deletedAt = post.deletedAt;
  }
}
