import { Injectable } from '@nestjs/common';

import { VideoProperties } from '@domain/video/video';

@Injectable()
export class VideoService {
  async getVideo(): Promise<VideoProperties[]> {
    return [];
  }
}
