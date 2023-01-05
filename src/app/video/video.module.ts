import { Module } from '@nestjs/common';

import { VideoController } from '@app/video/video.controller';
import { VideoService } from '@app/video/video.service';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
