import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';

@Controller('reddit-crawler')
@ApiTags('[크롤러] Reddit')
export class RedditCrawlerController {
  constructor(private readonly redditCrawlerService: RedditCrawlerService) {}

  @ApiOperation({ summary: 'Reddit의 현재 인기글 목록 크롤링을 합니다' })
  @ApiOkResponse({ type: Boolean })
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
