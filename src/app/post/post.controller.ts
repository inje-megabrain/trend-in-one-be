import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Pagination } from '../../infrastructure/types/pagination.types';

import { PostProfileResponse } from '@app/post/dtos/post-profile.response';
import { PostService } from '@app/post/post.service';

@Controller('posts')
@ApiTags('게시글')
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
}
