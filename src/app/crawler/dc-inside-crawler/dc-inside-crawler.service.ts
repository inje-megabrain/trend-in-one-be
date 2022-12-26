import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostIngredients } from '@app/crawler/dc-inside-crawler/dc-inside.command';
import { CrawlerClient } from '@app/crawler/types/crawler.client';
import { Post } from '@domain/post/post.entity';

@Injectable()
export class DcInsideCrawlerService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject('DcInsideClient')
    private readonly DcInsideClient: CrawlerClient,
  ) {}

  async crawlDcInside(): Promise<boolean> {
    const posts: PostIngredients[] = await this.DcInsideClient.crawl();
    await this.postRepository.save(posts);
    return true;
  }
}
