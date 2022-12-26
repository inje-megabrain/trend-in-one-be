import { Controller, Get, Post } from '@nestjs/common';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';

@Controller('dc-inside-crawler')
export class DcInsideCrawlerController {
  constructor(
    private readonly dcInsideCrawlerService: DcInsideCrawlerService,
  ) {}

  @Post()
  async crawlDcInside(): Promise<boolean> {
    return this.dcInsideCrawlerService.crawlDcInside();
  }

  //TODO: 크롤러의 현재 상태를 받아오는 API
  @Get()
  async getCrawlerStatus(): Promise<boolean> {
    return true;
  }
}
