import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoController } from '@app/video/video.controller';
import { VideoService } from '@app/video/video.service';
import { Community } from '@domain/post/community.entity';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, VideoChannel, Community])],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
