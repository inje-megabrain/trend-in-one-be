import { Injectable } from '@nestjs/common';

import { Post } from '../../domain/post/post.entity';

@Injectable()
export class PostService {
  // TODO: Implement PostRepository
  // TODO: Implement PostService
  async getAllPosts(): Promise<[Post]> {
    // TODO: Return all posts
    return;
  }
}
