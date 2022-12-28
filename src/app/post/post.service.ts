import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { Pagination } from '../../infrastructure/types/pagination.types';

import {
  PostByCommunityListQuery,
  PostListQuery,
} from '@app/post/post.command';
import { Community } from '@domain/post/community.entity';
import { Post } from '@domain/post/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,

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

  async getPostsByCommunityTitle(
    data: PostByCommunityListQuery,
  ): Promise<Pagination<Post>> {
    const { items, meta } = await paginate(
      this.postRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        relations: ['community'],
        where: { community: { title: data.communityTitle } },
      },
    );

    return { items, meta };
  }
}
