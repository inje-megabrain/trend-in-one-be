import { Controller, Get, Post } from '@nestjs/common';

import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';

@Controller('reddit-crawler')
export class RedditCrawlerController {
  constructor(private readonly redditCrawlerService: RedditCrawlerService) {}

  //TODO: 크롤러에게 직접적인 명령을 내릴 수 있는 API
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
