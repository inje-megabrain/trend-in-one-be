import { Controller, Get, Post } from '@nestjs/common';

import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';

@Controller('reddit-crawler')
export class RedditCrawlerController {
  constructor(private readonly redditCrawlerService: RedditCrawlerService) {}

  @Post()
  async crawlReddit(): Promise<boolean> {
    return this.redditCrawlerService.crawlReddit();
  }

  //TODO: 크롤러의 현재 상태를 받아오는 API
  @Get()
  async getCrawlerStatus(): Promise<boolean> {
    return true;
  }
}
