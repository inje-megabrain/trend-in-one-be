import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { VideoProfileResponse } from '@app/contents/video/dto/youtube-video.profile.response';
import { VideoService } from '@app/contents/video/video.service';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('videos')
@ApiTags('[콘텐츠] 영상')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOperation({ summary: '영상 목록을 조회합니다' })
  @ApiOkResponse({ type: [VideoProfileResponse] })
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
