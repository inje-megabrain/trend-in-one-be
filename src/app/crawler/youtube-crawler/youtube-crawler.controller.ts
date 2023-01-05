import { Controller, Post } from '@nestjs/common';

import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';

@Controller('youtube-crawler')
export class YoutubeCrawlerController {
  constructor(private readonly youtubeCrawlerService: YoutubeCrawlerService) {}
  @Post()
  async getVideos(): Promise<boolean> {
    await this.youtubeCrawlerService.getVideos();
    return true;
  }
}
