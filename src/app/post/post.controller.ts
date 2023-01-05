import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PostProfileResponse } from '@app/post/dto/post-profile.response';
import { PostService } from '@app/post/post.service';
import { CommunityTitle } from '@domain/post/post';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('posts')
@ApiTags('[게시글] 게시글')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '현재 인기글 목록을 조회합니다' })
  @ApiOkResponse({ type: [PostProfileResponse] })
  async getAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<PostProfileResponse>> {
    const { items, meta } = await this.postService.getAllPosts({ page, limit });

    return {
      items: items.map((item) => new PostProfileResponse({ ...item })),
      meta,
    };
  }

  @Get(':communityTitle')
  @ApiParam({
    name: 'communityTitle',
    required: true,
    description: '커뮤니티의 타이틀입니다',
    example: CommunityTitle.REDDIT,
  })
  @ApiOperation({ summary: '특정 커뮤니티의 인기글 목록을 조회합니다' })
  @ApiOkResponse({ type: [PostProfileResponse] })
  async getPostsByCommunityTitle(
    @Param('communityTitle') communityTitle: CommunityTitle,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<PostProfileResponse>> {
    const { items, meta } = await this.postService.getPostsByCommunityTitle({
      communityTitle,
      page,
      limit,
    });

    return {
      items: items.map((item) => new PostProfileResponse({ ...item })),
      meta,
    };
  }
}
