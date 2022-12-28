import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostIngredients } from '@app/crawler/dc-inside-crawler/dc-inside.command';
import { CrawlerClient } from '@app/crawler/types/crawler.client';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { Post } from '@domain/post/post.entity';

@Injectable()
export class DcInsideCrawlerService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
    @Inject('DcInsideClient')
    private readonly DcInsideClient: CrawlerClient,
  ) {}

  async crawlDcInside(): Promise<boolean> {
    const posts: PostIngredients[] = await this.DcInsideClient.crawl();
    const communityId = await this.communityRepository.findOne({
      where: { title: CommunityTitle.DC_INSIDE },
    });
    posts.map(async (post) => {
      const postEntity = this.postRepository.create({
        ...post,
        community: communityId,
      });
      await this.postRepository.save(postEntity);
    });
    await this.postRepository.save(posts);
    return true;
  }
}
