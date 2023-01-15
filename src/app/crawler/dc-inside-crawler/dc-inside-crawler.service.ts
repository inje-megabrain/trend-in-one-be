import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

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

    const isCommunityExist = await this.communityRepository.findOne({
      where: { title: CommunityTitle.DC_INSIDE },
    });

    if (!isCommunityExist) {
      await this.communityRepository.save({
        title: CommunityTitle.DC_INSIDE,
      });
    }

    const communityId = await this.communityRepository.findOne({
      where: { title: CommunityTitle.DC_INSIDE },
    });

    for (const postData of posts) {
      const post = await this.findByPostUrl(postData.postUrl);

      if (post) {
        if (post) {
          await this.postRepository.save({
            ...post,
            ...postData,
            community: communityId,
          });
        }
      } else {
        await this.postRepository.save({
          ...postData,
          community: communityId,
        });
      }
    }

    return true;
  }

  async findByPostUrl(
    postUrl: string,
    select?: FindOptionsSelect<Post>,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { postUrl },
      select,
    });

    return post;
  }
}
