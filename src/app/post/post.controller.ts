import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostProfileResponse } from '@app/post/dtos/post-profile.response';
import { PostService } from '@app/post/post.service';

@Controller('posts')
@ApiTags('게시글')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '현재 인기글 목록을 조회합니다' })
  @ApiOkResponse({ type: [PostProfileResponse] })
  async getAllPosts(): Promise<PostProfileResponse[]> {
    const posts = await this.postService.getAllPosts();

    return posts.map((post) => new PostProfileResponse(post));
  }
}
