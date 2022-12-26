import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';

@Controller('dc-inside-crawler')
@ApiTags('[크롤러] DC Inside')
export class DcInsideCrawlerController {
  constructor(
    private readonly dcInsideCrawlerService: DcInsideCrawlerService,
  ) {}

  @ApiOperation({ summary: 'DC Inside의 현재 인기글 목록 크롤링을 합니다' })
  @ApiOkResponse({ type: Boolean })
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
