import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { Pagination } from '../../infrastructure/types/pagination.types';

import { PostListQuery } from '@app/post/post.command';
import { Post } from '@domain/post/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(data: PostListQuery): Promise<Pagination<Post>> {
    const { items, meta } = await paginate(
      this.postRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        relations: ['community'],
      },
    );

    return { items, meta };
  }
}
