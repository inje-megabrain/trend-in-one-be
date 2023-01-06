import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';

@Controller('youtube-crawler')
@ApiTags('[크롤러] YOUTUBE')
export class YoutubeCrawlerController {
  constructor(private readonly youtubeCrawlerService: YoutubeCrawlerService) {}

  @Post()
  @ApiOperation({ summary: '유튜브 인기 영상 수집을 진행합니다.' })
  async getVideos(): Promise<boolean> {
    await this.youtubeCrawlerService.getVideos();
    return true;
  }
}
