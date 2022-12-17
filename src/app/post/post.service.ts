import { Post } from '@domain/post/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find(
      {
        relations: ['community'],
      }
    );

    return posts;
  }
}
