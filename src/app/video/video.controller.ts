import { Controller, Get } from '@nestjs/common';

import { VideoProfileResponse } from '@app/video/dto/youtube-video.profile.response';
import { VideoService } from '@app/video/video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async getVideos(): Promise<VideoProfileResponse[]> {
    const videos = await this.videoService.getVideo();
    return videos.map((video) => new VideoProfileResponse(video));
  }
}
