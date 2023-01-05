import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { Pagination } from '../../infrastructure/types/pagination.types';

import { VideoProfileResponse } from '@app/video/dto/youtube-video.profile.response';
import { VideoService } from '@app/video/video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async getVideos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<VideoProfileResponse>> {
    const { items, meta } = await this.videoService.getVideo({ page, limit });

    return {
      items: items.map((item) => new VideoProfileResponse({ ...item })),
      meta,
    };
  }
}
