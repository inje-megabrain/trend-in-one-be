import { Controller, Get } from '@nestjs/common';

import { PostProfileResponse } from '@app/post/dtos/post-profile.response';
import { PostService } from '@app/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<[PostProfileResponse]> {
    const posts = await this.postService.getAllPosts();
    // return posts.map((post) => new PostProfileResponse(post));
    return;
  }
}
